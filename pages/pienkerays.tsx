import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Footer from '@/components/footer';
import Hero from '@/components/hero';
import { fetchNavigationItems, NavigationItem } from '@/contentful/client';

interface PienkeraysProps {
  navigationItems?: NavigationItem[] | null;
}

const IconCopy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
    />
  </svg>
);

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-green-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="relative group">
      <div className="block text-xs font-bold uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="flex">
        <div className="w-full bg-[#7cdada] font-semibold rounded-l-lg border border-r-0 border-gray-200 flex items-center px-4 py-3 select-all break-words">
          {value}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-[#7cdada] border border-l-0 border-gray-200 rounded-r-lg px-4 flex items-center justify-center min-w-[3.5rem]"
          title="Kopioi leikepöydälle"
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
      </div>
    </div>
  );
}

const BANK_DETAILS = [
  { label: 'Saajan tilinumero', value: 'FI76 5710 0421 0148 79', id: 'iban' },
  { label: 'Saajan nimi', value: 'Turun Wappuradio ry', id: 'name' },
  { label: 'BIC', value: 'OKOYFIHH', id: 'bic' },
];

const Pienkerays: NextPage<PienkeraysProps> = ({ navigationItems }) => {
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>Turun Wappuradion pienkeräys</title>
        <meta
          name="description"
          content="Pienkeräys Turun Wappuradion tueksi"
        />
        <meta property="og:title" content="Turun Wappuradion pienkeräys" />
        <meta
          property="og:description"
          content="Pienkeräys Turun Wappuradion tueksi"
        />
        <meta
          property="og:url"
          content="https://www.turunwappuradio.com/pienkerays"
        />
      </Head>
      <Hero
        title="Pienkeräys"
        subtext="Turun Wappuradion tueksi"
        navigationItems={navigationItems}
        isCompact={true}
      />
      <article className="mx-auto max-w-4xl px-4 pb-20 pt-12 text-white">
        <div className="space-y-4">
          <p>
            Turun Wappuradiota kohtasi tämän vuoden aikana suuri taloudellinen
            takaisku, josta toipuminen on vaatinut ja tulee vielä jatkossakin
            vaatimaan yhteen hiileen puhaltamista. Nuorehkosta iästään
            huolimatta Turun Wappuradiosta on muodostunut monille
            merkityksellinen järjestö ja radiolähetyksiemme äärelle ovat
            kokoontuneet todistetusti niin vauvat kuin vaaritkin. Radio-ohjelmat
            ovat viihdyttäneet työpäivien aikana, tsempanneet opinnoissa,
            nostattaneet tunnelmaa illanvietoissa sekä lohduttaneet suruissa, ja
            tiedetään Turun Wappuradion saattaneen yhteen muutamia
            pariskuntiakin.
          </p>
          <p>
            Tämän rakkaan yhdistyksen toiminnan jatkuminen on sydämen asia
            meille nykyisille toimituslaisille, mutta uskomme radion olevan
            merkityksellinen myös muun muassa kuulijoille, aikaisemmille
            toimijoille, juontajille ja heille joiden mielestä kulttuuria ei voi
            koskaan olla liikaa ja radiotyön oppimisen mahdollistaminen
            matalalla kynnyksellä on hyvä juttu.
          </p>
          <p>
            Aloittamamme pienkeräyksen tarkoituksena on turvata Turun
            Wappuradion toiminnan jatkuminen niin, että tulevaisuudessakin
            opiskelijoilla ja opiskelijanmielisillä on mahdollisuus päästä
            kokeilemaan ja oppimaan uutta sekä kehittämään ja hyödyntämään jo
            olemassa olevia taitojaan, olipa kyse sitten mikserin käytöstä
            radio-ohjelman tuottamiseen tai vaikka mainosten
            käsikirjoittamisesta ja ääninäyttelemisestä. Suuri kiitos juuri
            Sinulle, joka haluat tukea Turun Wappuradiota tässä yllättävässä ja
            vaikeassa tilanteessa!
          </p>
        </div>
        <h1 className="my-4 text-2xl font-bold text-radio-accent200">
          Lahjoitustavat
        </h1>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full z-10 font-sans text-slate-800">
          {/* MobilePay */}
          <div className="bg-radio-promote rounded-2xl overflow-hidden flex flex-col h-full w-full transform transition hover:-translate-y-1 duration-300">
            <div className="relative w-full h-96 flex items-center justify-center">
              <Image
                src="/mobilepay.png"
                alt=""
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="bg-radio-promote text-radio-controller rounded-2xl overflow-hidden flex flex-col h-full transform transition hover:-translate-y-1 duration-300">
            <div className="p-6 flex items-center justify-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
              <h2 className="text-2xl font-bold">Tilisiirto</h2>
            </div>

            <div className="p-8 lg:text-xl flex flex-col justify-center flex-grow space-y-6">
              {BANK_DETAILS.map((detail) => (
                <CopyField
                  key={detail.id}
                  label={detail.label}
                  value={detail.value}
                />
              ))}
            </div>
          </div>
        </div>
        {/* End of cards */}

        <div className="mt-8 space-y-2">
          <p>Pienkeräyksen järjestäjä - Turun Wappuradio ry</p>
          <p>Pienkeräyksellä saatavien varojen käyttötarkoitus</p>
          <p>
            Ensisijaisesti varoja hankitaan tulevan kevään radiolähetykseen ja
            myöhempiin lähetyksiin, jotka on yhdistyksen toiminnan tarkoitus.
            Suurimpina kuluerinä Digitan palvelu-, Gramexin lupa- ja Teoston
            lupa- maksut sekä konttistudion vuokra. Pienkeräysvaroja käytetään
            toiminnan jatkuvuuden kannalta pakollisiin menoihin, sillä yhdistys
            on joutunut kavalluksen uhriksi.
          </p>
          <p>
            Mikäli kerättyjä varoja ei voida kokonaan tai osittain käyttää
            lupamaksuihin tai konttivuokraan, tullaan ne käyttämään jäsenille ja
            toiminnassa mukana oleville järjestettävään toimintaan, kuten
            kouluttautumistilaisuudet sekä 10v juhlavuoden tapahtumiin.
          </p>
          <p>Pienkeräysnumero - RA/2025/1686</p>
          <p>
            Pienkeräyksen järjestäjän yhteystiedot - Vesilinnantie 5, 20014
            Turun yliopisto, hallitus@turunwappuradio.com, 040 366 0129
          </p>
        </div>

        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative h-64 w-full">
            <Image
              src="/kontti.png"
              alt="Kuva 1"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          <div className="relative h-64 w-full">
            <Image
              src="/konttistudio.jpg"
              alt="Kuva 2"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>
      </article>
      <Footer navigationItems={navigationItems} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<PienkeraysProps> = async () => {
  const navigationItems = await fetchNavigationItems();

  return {
    props: {
      navigationItems,
    },
  };
};

export default Pienkerays;
