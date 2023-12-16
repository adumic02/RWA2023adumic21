# rest/korisnici
curl -X GET "http://localhost:10000/rest/korisnici/"
curl -X POST "http://localhost:10000/rest/korisnici/" -H 'Content-Type: application/json' -d '{"ime":"Pero", "prezime":"Kos", "lozinka":"123456", "email":"pkos@foi.unizg.hr", "korime":"pkos"}'
curl -X PUT "http://localhost:10000/rest/korisnici/"
curl -X DELETE "http://localhost:10000/rest/korisnici/"

# rest/korisnici/{korime}
curl -X GET "http://localhost:10000/rest/korisnici/pkos"
curl -X POST "http://localhost:10000/rest/korisnici/pkos"
curl -X PUT "http://localhost:10000/rest/korisnici/pkos" -H 'Content-Type: application/json' -d '{"ime":"Test2", "prezime":"Test", "lozinka":"123456", "email":"test2@foi.unizg.hr"}'
curl -X DELETE "http://localhost:10000/rest/korisnici/pkos"

# rest/korisnici/{korime}/prijava
curl -X GET "http://localhost:10000/rest/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"123456"}'
curl -X POST "http://localhost:10000/rest/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"123456"}'
curl -X PUT "http://localhost:10000/rest/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"123456"}'
curl -X DELETE "http://localhost:10000/rest/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"123456"}'

#POGRESNA PRIJAVA
curl -X POST "http://localhost:10000/rest/korisnici/pkos/prijava" -H 'Content-Type: application/json' -d '{"lozinka":"12345"}'

# rest/glumci?str=1&
curl --request GET \
     --url 'http://localhost:10000/rest/glumci?str=1&filter=jos' \
     --header 'Authorization: Bearer 75f4b54207df99b009d5559e318ff623' \
     --header 'accept: application/json'

curl --request POST \
    --url 'http://localhost:10000/rest/korisnici/pkos/prijava' \
    --header 'Authorization: Bearer 75f4b54207df99b009d5559e318ff623' \
    --header 'accept: application/json'
