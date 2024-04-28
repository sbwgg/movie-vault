import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { WideContainer } from "@/components/layout/WideContainer";
import { Link } from "@/components/player/internals/ContextMenu/Links";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { HomeLayout } from "@/pages/layouts/HomeLayout";
import { BookmarksPart } from "@/pages/parts/home/BookmarksPart";
import { HeroPart } from "@/pages/parts/home/HeroPart";
import { WatchingPart } from "@/pages/parts/home/WatchingPart";
import { SearchListPart } from "@/pages/parts/search/SearchListPart";
import { SearchLoadingPart } from "@/pages/parts/search/SearchLoadingPart";

import { Icon, Icons } from "../components/Icon";

function useSearch(search: string) {
  const [searching, setSearching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearch = useDebounce<string>(search, 500);
  useEffect(() => {
    setSearching(search !== "");
    setLoading(search !== "");
  }, [search]);
  useEffect(() => {
    setLoading(false);
  }, [debouncedSearch]);
  return {
    loading,
    searching,
  };
}

export function HomePage() {
  const { t } = useTranslation();
  const [showBg, setShowBg] = useState(false);
  const searchParams = useSearchQuery();
  const [search] = searchParams;
  const { loading } = useSearch(search);
  const navigate = useNavigate();

  const handleMouseEnter = (e: { currentTarget: { style: { transform: string; filter: string; }; }; }) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.filter = 'brightness(1.2)';
  };

  const handleMouseLeave = (e: { currentTarget: { style: { transform: string; filter: string; }; }; }) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.filter = 'brightness(1)';
  };

  return (
    <HomeLayout showBg={showBg}>
      <div className="mb-16 sm:mb-24">
        <Helmet>
          <title>{t("global.name")}</title>
        </Helmet>
        <HeroPart searchParams={searchParams} setIsSticky={setShowBg} />
        <div style={{ textAlign: 'center' }}>
          <RouterLink
            to="/discover"
            className="text-buttons-secondaryText rounded-[28px] p-3 flex items-center cursor-pointer search-bar"
            id="explore"
            style={{
              fontSize: '18px',
              color: '#3f3f5e',
              backgroundColor: '#1f1f32',
              transition: 'transform 0.2s, filter 0.2s',
              borderRadius: '28px',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '8px 12px', 
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mr-1"> 
              <Icon icon={Icons.MOVIE} />
            </div>
            <p style={{ margin: 0 }}>Discover Your Next Movie or Series</p>
          </RouterLink>
        </div>
      </div>
      <WideContainer>
        {loading ? <SearchLoadingPart /> : search ? <SearchListPart searchQuery={search} /> : <>
          <BookmarksPart />
          <WatchingPart />
        </>}
      </WideContainer>
    </HomeLayout>
  );
}
