# Vanhojen lähetysten arkistointi

## Alustus - Contentfull

1. Luo Contentfuliin `Ohjelmakartta`-tyyppinen sisältö
   1. Esim. kopioi edellisen vuoden lähetys `Wappuradio|Syssyradio <vuosiluku>`
   2. Muuta `nimi` sekä `id`. HUOM! Id vastattava myöhemmässä vaiheessa annettua tunnistetta esim `2024-wappu`
   3. Lisää kuvaus, kansikuva ja aseta lähetysjärjestys

## Alustus - Aws

1. Lataa [`aws cli`](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Kirjaudu AWS konsoliin (pyydä url muilta kehittäjiltä)
3. Siirry `IAM > Users > <oma käyttäjä>`
4. Valitse `Security credentials`
5. Luo `Access key`
6. Tallenna `~/.aws/credentials` tiedostoon `aws_access_key_id` sekä `aws_secret_access_key`

`~/.aws/credentials` esimerkki (huom alias `wappuradio`)
```
[wappuradio]
aws_access_key_id=123
aws_secret_access_key=abc
```

## Arkistoinnin lataus koneelle

1. Etsi `archiveOldShowlists` ja lisää `sheetConfigs`-listaan viimeisin lähetys esimerkkien muodossa (poista kommentointi, jos kommentoitu)
2. Käynnistä projekti lokaalisti
3. Avaa projekti selaimella ja lisää osoitteeseen `/api/archiver`
   1. Se alkaa hyrskyttelemään lähetyksen kuvat sekä ohjelmakartta `showlist.json` projektin juureen `stuff/archives/<id>` -kansioon
4. Kun selain näyttää viestin `{"message":"ok"}` niin hommat ok

## Arkiston lataaminen S3:een

1. Lataa arkistokansio purkkiin komennolla `aws s3 --profile wappuradio cp stuff/archives/<id> s3://archive.turunwappuradio.com/<id> --acl public-read`

Esimerkiksi: `aws s3 --profile wappuradio cp stuff/archives/2024-wappu s3://archive.turunwappuradio.com/2024-wappu --acl public-read`
