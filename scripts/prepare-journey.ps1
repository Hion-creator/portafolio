param(
  [Parameter(Mandatory = $true)][string]$InputDirectory,
  [string]$Ffmpeg = 'ffmpeg'
)
$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$mediaRoot = Join-Path $siteRoot 'public/media/journey'
$fps = 12
$framesPerClip = 48
foreach ($variant in @(@{ name = 'desktop'; width = 1280 }, @{ name = 'mobile'; width = 960 })) {
  $destination = Join-Path $mediaRoot $variant.name
  New-Item -ItemType Directory -Force $destination | Out-Null
  for ($clip = 1; $clip -le 3; $clip++) {
    $inputFile = Join-Path $InputDirectory ('transicion-{0:00}.mp4' -f $clip)
    if (!(Test-Path -LiteralPath $inputFile)) { throw "Missing video: $inputFile" }
    $firstFrame = ($clip - 1) * $framesPerClip + 1
    & $Ffmpeg -hide_banner -loglevel error -y -i $inputFile -t 4 -vf "fps=$fps,scale=$($variant.width):-1" -an -c:v libwebp -quality 70 -compression_level 6 -frames:v $framesPerClip -start_number $firstFrame (Join-Path $destination 'frame-%04d.webp')
    if ($LASTEXITCODE -ne 0) { throw "Frame extraction failed for $inputFile" }
  }
  for ($frame = 1; $frame -le 144; $frame++) {
    if (!(Test-Path -LiteralPath (Join-Path $destination ('frame-{0:0000}.webp' -f $frame)))) { throw "Missing frame $frame" }
  }
}
$manifest = @{
  version = 1; frameCount = 144; fps = $fps; duration = 12
  desktop = @{ path = '/media/journey/desktop'; width = 1280; height = 720 }
  mobile = @{ path = '/media/journey/mobile'; width = 960; height = 540 }
}
$manifest | ConvertTo-Json -Depth 3 | Set-Content -Encoding utf8 (Join-Path $mediaRoot 'manifest.json')
Write-Output 'Prepared 144 frames per variant, 12 seconds total. No video downloads occur in the browser.'
