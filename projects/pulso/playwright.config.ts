import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{baseURL:'http://127.0.0.1:4200',channel:process.platform==='win32'?'msedge':undefined,headless:true},webServer:{command:'node node_modules/@angular/cli/bin/ng.js serve --host 127.0.0.1 --port 4200',url:'http://127.0.0.1:4200',reuseExistingServer:true,timeout:120000}});
