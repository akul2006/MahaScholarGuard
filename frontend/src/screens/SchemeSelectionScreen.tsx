import React, { useState, useEffect } from 'react';
import { StatutoryBanner } from '../components/StatutoryBanner';
import { ScreenId, Language, ScholarshipScheme } from '../types';
import { fetchScholarshipSchemes, MOCK_SCHEMES } from '../services/scholarshipService';

interface SchemeSelectionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  selectedSchemeId: string;
  onSelectScheme: (scheme: ScholarshipScheme) => void;
}

export const SchemeSelectionScreen: React.FC<SchemeSelectionScreenProps> = ({
  onNavigate,
  language,
  selectedSchemeId,
  onSelectScheme,
}) => {
  const [schemes, setSchemes] = useState<ScholarshipScheme[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogSource, setCatalogSource] = useState<'loading' | 'api' | 'fallback'>('loading');

  useEffect(() => {
    let isMounted = true;

    fetchScholarshipSchemes()
      .then((data) => {
        if (!isMounted) return;
        setSchemes(data);
        setCatalogSource('api');
      })
      .catch(() => {
        // Keep the prototype usable during backend outages, but make fallback explicit.
        if (!isMounted) return;
        setSchemes(MOCK_SCHEMES);
        setCatalogSource('fallback');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory =
      categoryFilter === 'ALL' || scheme.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      scheme.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.departmentEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Regulatory Banner */}
      <StatutoryBanner language={language} />

      {/* Screen Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#3755c3]">list_alt</span>
          <span className="text-xs uppercase font-semibold tracking-wider text-[#3755c3]">
            Maharashtra Scholarship Catalog
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-[#000412] font-bold">
          Select Your Targeted Scholarship Scheme
        </h1>
        <p className="font-body-md text-body-md text-[#44474d] max-w-3xl mt-1">
          Choose the scheme applicable to your social category, family income bracket, and degree course. Each scheme runs a deterministic document checklist audit.
        </p>
      </div>

      {catalogSource !== 'api' && (
        <div
          role="status"
          className={`p-3 rounded-lg mb-4 text-xs border ${
            catalogSource === 'loading'
              ? 'bg-[#f2f4f6] border-[#c5c6ce] text-[#44474d]'
              : 'bg-[#fff4e5] border-[#f0c36d] text-[#6b4b00]'
          }`}
        >
          {catalogSource === 'loading'
            ? 'Loading scheme catalogue from the backend…'
            : 'Backend catalogue unavailable. Showing prototype fallback data; verify scheme requirements on the official MahaDBT portal.'}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e6e8ea] mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Schemes (4)' },
            { id: 'EBC', label: 'EBC / General' },
            { id: 'SC', label: 'SC / Navabuddha' },
            { id: 'OBC', label: 'OBC / VJNT / SBC' },
            { id: 'ST', label: 'ST / Tribal' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#0f1e36] text-white'
                  : 'bg-[#eceef0] text-[#44474d] hover:bg-[#e6e8ea]'
              }`}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#75777e]">
            search
          </span>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] rounded-lg text-[#191c1e] text-xs focus:outline-none focus:bg-white border border-[#c5c6ce] placeholder:text-[#75777e]"
            placeholder="Search scheme name or dept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredSchemes.map((scheme) => {
          const isSelected = selectedSchemeId === scheme.id;
          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-xl p-6 shadow-sm border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#3755c3] ring-2 ring-[#3755c3]/20'
                  : 'border-[#e6e8ea] hover:border-[#c5c6ce]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono bg-[#dde1ff] text-[#001453] px-2 py-0.5 rounded font-bold">
                    {scheme.code}
                  </span>
                  <span className="text-xs bg-[#f2f4f6] text-[#44474d] px-2 py-0.5 rounded font-medium">
                    {scheme.requiredDocuments.length} Required Docs
                  </span>
                </div>

                <h2 className="font-headline-sm text-headline-sm text-[#000412] font-bold mb-1 leading-snug">
                  {language === 'mr' ? scheme.nameMr : scheme.nameEn}
                </h2>

                <span className="text-xs text-[#3755c3] font-semibold block mb-3">
                  {language === 'mr' ? scheme.departmentMr : scheme.departmentEn}
                </span>

                <p className="font-body-sm text-body-sm text-[#44474d] mb-4 leading-relaxed">
                  {language === 'mr' ? scheme.overviewMr : scheme.overviewEn}
                </p>

                {/* Key Eligibility Rules */}
                <div className="bg-[#f2f4f6] p-3 rounded-lg space-y-1.5 mb-4 text-xs">
                  <div className="flex items-center gap-1.5 text-[#191c1e]">
                    <span className="material-symbols-outlined text-[16px] text-[#3755c3]">
                      payments
                    </span>
                    <span className="font-semibold">{scheme.incomeCapLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#191c1e]">
                    <span className="material-symbols-outlined text-[16px] text-[#3755c3]">
                      home_pin
                    </span>
                    <span>Maharashtra Domicile: <strong>Mandatory</strong></span>
                  </div>
                </div>

                {/* Required Documents Mini-List */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-[#191c1e] block mb-2">
                    Mandatory Checklist Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.requiredDocuments.map((doc) => (
                      <span
                        key={doc.code}
                        className="text-[11px] bg-[#eceef0] text-[#44474d] px-2 py-0.5 rounded"
                      >
                        {doc.nameEn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#eceef0] flex items-center justify-between">
                <a
                  href={scheme.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#3755c3] hover:underline flex items-center gap-1"
                >
                  <span>MahaDBT Info</span>
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </a>

                <button
                  onClick={() => {
                    onSelectScheme(scheme);
                    onNavigate('upload-wizard');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#3755c3] text-white shadow-sm'
                      : 'bg-[#0f1e36] text-white hover:bg-[#3755c3]'
                  }`}
                  type="button"
                >
                  <span>{isSelected ? 'Selected • Continue' : 'Select Scheme & Upload'}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Data Notice */}
      <div className="bg-[#f2f4f6] p-4 rounded-xl border border-[#c5c6ce] flex items-center gap-3">
        <span className="material-symbols-outlined text-[#3755c3] text-[20px]">policy</span>
        <span className="text-xs text-[#44474d]">
          Official Government Resolution (GR) criteria. MahaScholar Guard operates with deterministic rules mapped to current Maharashtra administrative circulars.
        </span>
      </div>
    </div>
  );
};
