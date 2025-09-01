// client/src/i18n/countries.ts
export type Currency =
  | 'USD'|'EUR'|'GBP'|'ZAR'|'NGN'|'KES'|'GHS'|'TZS'|'UGX'|'RWF'|'ZMW'|'BWP'|'NAD'|'LSL'|'SZL'|'MZN'|'AOA'|'DZD'|'EGP'|'MAD'|'TND'
  | 'CNY'|'JPY'|'KRW'|'INR'|'PKR'|'BDT'|'LKR'|'NPR'|'THB'|'VND'|'MYR'|'SGD'|'IDR'|'PHP'|'KHR'|'LAK'
  | 'AED'|'SAR'|'QAR'|'KWD'|'BHD'|'OMR'|'JOD'|'LBP'|'IQD'|'TRY'|'ILS'|'IRR'
  | 'AUD'|'NZD'|'CAD'|'CHF'|'SEK'|'NOK'|'DKK'|'PLN'|'CZK'|'HUF'|'RON'|'BGN'|'HRK'|'UAH'|'RUB'|'MXN'|'BRL'|'ARS'|'CLP'|'COP'|'PEN';

export type CountryCode = string;

export type Country = {
  code: CountryCode;
  name: string;
  currency: Currency;
  defaultLocale: string; // e.g. 'en', 'fr', 'de', 'sw', etc.
};

// A practical set covering key regions (you can extend any time)
export const countries: Country[] = [
  // Southern & wider Africa
  { code:'ZA', name:'South Africa', currency:'ZAR', defaultLocale:'en' },
  { code:'ZW', name:'Zimbabwe', currency:'ZAR', defaultLocale:'en' },
  { code:'BW', name:'Botswana', currency:'BWP', defaultLocale:'en' },
  { code:'NA', name:'Namibia', currency:'NAD', defaultLocale:'en' },
  { code:'LS', name:'Lesotho', currency:'LSL', defaultLocale:'st' },
  { code:'SZ', name:'Eswatini', currency:'SZL', defaultLocale:'en' },
  { code:'MZ', name:'Mozambique', currency:'MZN', defaultLocale:'pt' },
  { code:'AO', name:'Angola', currency:'AOA', defaultLocale:'pt' },
  { code:'ZM', name:'Zambia', currency:'ZMW', defaultLocale:'en' },
  { code:'MW', name:'Malawi', currency:'ZMW', defaultLocale:'en' },
  { code:'TZ', name:'Tanzania', currency:'TZS', defaultLocale:'sw' },
  { code:'KE', name:'Kenya', currency:'KES', defaultLocale:'sw' },
  { code:'UG', name:'Uganda', currency:'UGX', defaultLocale:'en' },
  { code:'RW', name:'Rwanda', currency:'RWF', defaultLocale:'en' },
  { code:'BI', name:'Burundi', currency:'RWF', defaultLocale:'fr' },
  { code:'CD', name:'DR Congo', currency:'CDF' as any, defaultLocale:'fr' },
  { code:'CG', name:'Congo (Brazzaville)', currency:'XAF' as any, defaultLocale:'fr' },
  { code:'NG', name:'Nigeria', currency:'NGN', defaultLocale:'en' },
  { code:'GH', name:'Ghana', currency:'GHS', defaultLocale:'en' },
  { code:'SN', name:'Senegal', currency:'XOF' as any, defaultLocale:'fr' },
  { code:'CI', name:'Côte d’Ivoire', currency:'XOF' as any, defaultLocale:'fr' },
  { code:'CM', name:'Cameroon', currency:'XAF' as any, defaultLocale:'fr' },
  { code:'DZ', name:'Algeria', currency:'DZD', defaultLocale:'ar' },
  { code:'MA', name:'Morocco', currency:'MAD', defaultLocale:'ar' },
  { code:'TN', name:'Tunisia', currency:'TND', defaultLocale:'ar' },
  { code:'EG', name:'Egypt', currency:'EGP', defaultLocale:'ar' },

  // Middle East
  { code:'AE', name:'United Arab Emirates', currency:'AED', defaultLocale:'ar' },
  { code:'SA', name:'Saudi Arabia', currency:'SAR', defaultLocale:'ar' },
  { code:'QA', name:'Qatar', currency:'QAR', defaultLocale:'ar' },
  { code:'KW', name:'Kuwait', currency:'KWD', defaultLocale:'ar' },
  { code:'BH', name:'Bahrain', currency:'BHD', defaultLocale:'ar' },
  { code:'OM', name:'Oman', currency:'OMR', defaultLocale:'ar' },
  { code:'JO', name:'Jordan', currency:'JOD', defaultLocale:'ar' },
  { code:'LB', name:'Lebanon', currency:'LBP', defaultLocale:'ar' },
  { code:'IL', name:'Israel', currency:'ILS', defaultLocale:'en' },
  { code:'TR', name:'Türkiye', currency:'TRY', defaultLocale:'tr' },

  // Asia
  { code:'CN', name:'China', currency:'CNY', defaultLocale:'zh' },
  { code:'JP', name:'Japan', currency:'JPY', defaultLocale:'ja' },
  { code:'KR', name:'South Korea', currency:'KRW', defaultLocale:'ko' },
  { code:'IN', name:'India', currency:'INR', defaultLocale:'hi' },
  { code:'PK', name:'Pakistan', currency:'PKR', defaultLocale:'ur' as any },
  { code:'BD', name:'Bangladesh', currency:'BDT', defaultLocale:'bn' as any },
  { code:'LK', name:'Sri Lanka', currency:'LKR' as any, defaultLocale:'si' as any },
  { code:'NP', name:'Nepal', currency:'NPR', defaultLocale:'ne' as any },
  { code:'TH', name:'Thailand', currency:'THB', defaultLocale:'th' as any },
  { code:'VN', name:'Vietnam', currency:'VND', defaultLocale:'vi' as any },
  { code:'MY', name:'Malaysia', currency:'MYR', defaultLocale:'ms' as any },
  { code:'SG', name:'Singapore', currency:'SGD', defaultLocale:'en' },
  { code:'ID', name:'Indonesia', currency:'IDR', defaultLocale:'id' as any },
  { code:'PH', name:'Philippines', currency:'PHP', defaultLocale:'en' },

  // Europe (sample wide coverage)
  { code:'GB', name:'United Kingdom', currency:'GBP', defaultLocale:'en' },
  { code:'IE', name:'Ireland', currency:'EUR', defaultLocale:'en' },
  { code:'DE', name:'Germany', currency:'EUR', defaultLocale:'de' },
  { code:'FR', name:'France', currency:'EUR', defaultLocale:'fr' },
  { code:'ES', name:'Spain', currency:'EUR', defaultLocale:'es' },
  { code:'PT', name:'Portugal', currency:'EUR', defaultLocale:'pt' },
  { code:'IT', name:'Italy', currency:'EUR', defaultLocale:'it' },
  { code:'NL', name:'Netherlands', currency:'EUR', defaultLocale:'nl' as any },
  { code:'BE', name:'Belgium', currency:'EUR', defaultLocale:'fr' },
  { code:'AT', name:'Austria', currency:'EUR', defaultLocale:'de' },
  { code:'CH', name:'Switzerland', currency:'CHF', defaultLocale:'de' },
  { code:'SE', name:'Sweden', currency:'SEK', defaultLocale:'sv' as any },
  { code:'NO', name:'Norway', currency:'NOK', defaultLocale:'no' as any },
  { code:'DK', name:'Denmark', currency:'DKK', defaultLocale:'da' as any },
  { code:'PL', name:'Poland', currency:'PLN', defaultLocale:'pl' as any },
  { code:'CZ', name:'Czechia', currency:'CZK', defaultLocale:'cs' as any },
  { code:'HU', name:'Hungary', currency:'HUF', defaultLocale:'hu' as any },
  { code:'RO', name:'Romania', currency:'RON', defaultLocale:'ro' as any },
  { code:'BG', name:'Bulgaria', currency:'BGN', defaultLocale:'bg' as any },
  { code:'GR', name:'Greece', currency:'EUR', defaultLocale:'el' as any },
  { code:'UA', name:'Ukraine', currency:'UAH', defaultLocale:'uk' as any },

  // Americas & Oceania (common)
  { code:'US', name:'United States', currency:'USD', defaultLocale:'en' },
  { code:'CA', name:'Canada', currency:'CAD', defaultLocale:'en' },
  { code:'MX', name:'Mexico', currency:'MXN', defaultLocale:'es' },
  { code:'BR', name:'Brazil', currency:'BRL', defaultLocale:'pt' },
  { code:'AR', name:'Argentina', currency:'ARS', defaultLocale:'es' },
  { code:'CL', name:'Chile', currency:'CLP', defaultLocale:'es' },
  { code:'CO', name:'Colombia', currency:'COP', defaultLocale:'es' },
  { code:'PE', name:'Peru', currency:'PEN', defaultLocale:'es' },
  { code:'AU', name:'Australia', currency:'AUD', defaultLocale:'en' },
  { code:'NZ', name:'New Zealand', currency:'NZD', defaultLocale:'en' },
];

export const currencies = Array.from(new Set(countries.map(c => c.currency)));
