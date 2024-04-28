import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { WideContainer } from "@/components/layout/WideContainer";
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
  const [showBg, setShowBg] = useState<boolean>(false);
  const searchParams = useSearchQuery();
  const [search] = searchParams;
  const s = useSearch(search);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <HomeLayout showBg={showBg}>
      <div className="mb-16 sm:mb-24">
        <Helmet>
          <title>{t("global.name")}</title>
        </Helmet>
        <HeroPart searchParams={searchParams} setIsSticky={setShowBg} />
        <div style={{ textAlign: 'center' }}>
  <a href="/discover" style={{ display: 'inline-block', textDecoration: 'none', color: 'inherit' }}>
  <p
    className="text-buttons-secondaryText rounded-[28px] p-3 flex items-center cursor-pointer"
    id="explore"
    style={{
        fontSize: '18px',
        color: '#5a5a5b',
        backgroundColor: 'rgba(40, 40, 40, 0.9)',
        transition: 'transform 0.2s, filter 0.2s', // Add transition for smooth hover effect
    }}
    onClick={() => {
        navigate("/discover"); // Navigate to "/discover" on click
    }}
    onMouseEnter={(e) => {
        const target = e.target as HTMLElement; // Cast e.target to HTMLElement
        target.style.transform = 'scale(1.05)'; // Increase size on hover
        target.style.filter = 'brightness(1.2)'; // Make lighter on hover
    }}
    onMouseLeave={(e) => {
        const target = e.target as HTMLElement; // Cast e.target to HTMLElement
        target.style.transform = 'scale(1)'; // Reset size on mouse leave
        target.style.filter = 'brightness(1)'; // Reset lightness on mouse leave
    }}
>
    <Icon icon={Icons.MOVIE} className="mr-2" />
    Discover Your Next Movie or Series
</p>
  </a>
</div>

      </div>
      <WideContainer>
        {s.loading ? (
          <SearchLoadingPart />
        ) : s.searching ? (
          <SearchListPart searchQuery={search} />
        ) : (
          <>
            <BookmarksPart />
            <WatchingPart />
          </>
        )}
      </WideContainer>
    </HomeLayout>
  );
}

