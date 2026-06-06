$body = @{
    email = "testuser@example.com"
    password = "TestPassword123"
    name = "Test User"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri 'http://localhost:3001/api/auth/register' -Method POST -ContentType 'application/json' -Body $body

Write-Host "Registration Response:"
Write-Host ($response | ConvertTo-Json)
