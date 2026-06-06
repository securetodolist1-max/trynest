$body = @{
    email = "admin@example.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri 'http://localhost:3001/api/auth/login' -Method POST -ContentType 'application/json' -Body $body

Write-Host "Login Response:"
Write-Host ($response | ConvertTo-Json)
