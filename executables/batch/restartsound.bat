rem Written for buggy audio drivers that need to be restarted
rem In my case, the Claro 8.18 drivers bug out every once in a while on Windows 10, and need restarting to not sound poppy

@echo off
goto check_Permissions

:check_Permissions
    echo Administrative permissions required to run this script. Checking...

    net session >nul 2>&1
    if %errorLevel% == 0 (
        goto gotAdmin
    ) else (
        goto UACPrompt
    )

    pause >nul
    exit

    
:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
    net stop audiosrv /y
    net stop AudioEndpointBuilder /y
    net start audiosrv
    net start AudioEndpointBuilder
    rem This next line is just for my configuration, or anyone else that has Razer headphones
    net start RzSurroundVADStreamingService
    exit
    

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B