import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { WideContainer } from "@/components/layout/WideContainer";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { HomeLayout } from "@/pages/layouts/HomeLayout";
import { BookmarksPart } from "@/pages/parts/home/BookmarksPart";
import { HeroPart } from "@/pages/parts/home/HeroPart";
import { WatchingPart } from "@/pages/parts/home/WatchingPart";
import { SearchListPart } from "@/pages/parts/search/SearchListPart";
import { SearchLoadingPart } from "@/pages/parts/search/SearchLoadingPart";

export function HomePage() {
  const { t } = useTranslation();
  const [showBg, setShowBg] = useState(false);
  const searchParams = useSearchQuery();
  const [search] = searchParams;

  const styles = `
    .hovered-link:hover {
      transform: scale(1.05);
      background-color: #3f3f60;
      color: #ffffff;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <HomeLayout showBg={showBg}>
        <Helmet>
          <title>Home - movie-vault</title>
        </Helmet>
        <div className="mb-16 sm:mb-24">
          <HeroPart searchParams={searchParams} setIsSticky={setShowBg} />
          <div style={{ textAlign: 'center' }}>
            <RouterLink
              to="/discover"
              className="text-buttons-secondaryText rounded-[28px] p-3 flex items-center cursor-pointer search-bar hovered-link"
              id="explore"
              style={{
                fontSize: '18px',
                color: '#3f3f5e',
                backgroundColor: '#1f1f32',
                borderRadius: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                padding: '8px 12px',
                transition: 'transform 0.2s, background-color 0.2s, color 0.2s, filter 0.2s',
              }}
            >
              <p className="font-bold text-buttons-secondaryText" style={{ fontSize: "18px" }}>🎥 Discover Your Next Movie or Series</p>
            </RouterLink>
          </div>
        </div>
        <WideContainer>
          {search ? (
            <SearchListPart searchQuery={search} />
          ) : (
            <>
              <BookmarksPart />
              <WatchingPart />
            </>
          )}
        </WideContainer>
      </HomeLayout>
    </>
  );
}
