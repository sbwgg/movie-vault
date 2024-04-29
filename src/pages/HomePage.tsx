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

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export function Notification({ message, onClose }: NotificationProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-#1f1f32 rounded-lg p-8 max-w-md relative">
        <button
          type="button"
          className="absolute top-0 right-0 mt-2 mr-2 bg-rgba(30,30,51,255)-500 hover:bg-rgba(30,30,51,255)-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleClose}
        >
          x
        </button>
        <p className="font-bold text-xl text-center bg-gray-700 text-white p-2 rounded-md">
          {message}
        </p>
      </div>
    </div>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const [showBg, setShowBg] = useState(false);
  const searchParams = useSearchQuery();
  const [search] = searchParams;
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Check if the notification has been closed previously
    const isNotificationClosed = localStorage.getItem("notificationClosed");
    if (isNotificationClosed) {
      setShowNotification(false);
    }
  }, []);

  const handleCloseNotification = () => {
    // Close the notification and store the flag in local storage
    setShowNotification(false);
    localStorage.setItem("notificationClosed", "true");
  };

  useEffect(() => {
    // Disable scrolling when notification is active
    if (showNotification) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNotification]);

  return (
    <HomeLayout showBg={showBg}>
      <Helmet>
  <title>Home - movie-vault</title>
</Helmet>
      {/* Notification */}
      {showNotification && (
        <Notification
          message="If you want to use NSBX (our best source), please disable the extension as it interferes with this source."
          onClose={handleCloseNotification}
        />
      )}
      <div className="mb-16 sm:mb-24">
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
          >
            <p className="font-bold text-buttons-secondaryText" style={{ fontSize: "18px" }}>🎥 Discover Your Next Movie or Series </p>
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
  );
}
