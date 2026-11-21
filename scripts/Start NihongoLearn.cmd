@echo off
echo Keep this window open while you study. Press Ctrl+C to stop the preview.
"%~dp0runtime\node.exe" "%~dp0app\serve.mjs" --open
if errorlevel 1 pause
