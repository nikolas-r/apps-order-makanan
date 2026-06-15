'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { items } from '@/items';
import { hooks } from '@/hooks';
import { constants } from '@/constants';
import { components } from '@/components';
import { DishType } from '@/types/DishType';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLButtonElement>(null);

  const { dishes } = hooks.useGetDishes();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(check());
  }, []);

  const renderHeader = () => {
    return (
      <components.Header title="Search" showUser={true} showBasket={true} />
    );
  };

  const renderSearch = () => {
    return (
      <button
        ref={searchInputRef}
        style={{
          backgroundColor: constants.colors.whiteColor,
          width: '100%',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          height: 50,
          paddingLeft: 20,
          cursor: 'pointer',
          position: 'fixed',
          top: constants.sizes.headerHeight + 10,
          zIndex: 10000,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: isMobile
            ? 'calc(100% - 40px)'
            : constants.sizes.screenWidth - 40,
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const result = window.prompt('Enter your search query', searchQuery);
          if (result !== null) {
            setSearchQuery(result);
          }
        }}
        type="button"
      >
        <span
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            marginRight: 'auto',
            paddingRight: 20,
            color: searchQuery
              ? constants.colors.mainDarkColor
              : constants.colors.textColor,
          }}
        >
          {searchQuery || 'Search dishes...'}
        </span>
        {/* clear text */}
        {searchQuery && (
          <div
            style={{
              position: 'absolute',
              right: 20,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSearchQuery('');
            }}
          >
            <span>clear</span>
          </div>
        )}
      </button>
    );
  };

  const renderContent = () => {
    const filteredDishes = dishes.filter((dish: DishType) => {
      return dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <section style={{
        overflowY: 'auto',
        marginTop: constants.sizes.headerHeight + 70,
        marginBottom: constants.sizes.tabBarHeight,
        paddingTop: 20,
        paddingBottom: 20,
      }}>
        <ul
          style={{
            ...constants.flex.flexColumn,
            paddingLeft: 20,
            paddingRight: 20,
            gap: 14,
          }}
        >
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish: DishType) => {
              return <items.RecommendedItem dish={dish} key={dish.id} />;
            })
          ) : (
            <p style={{ textAlign: 'center', color: constants.colors.textColor, marginTop: 20 }}>
              Menu "{searchQuery}" tidak ditemukan.
            </p>
          )}
        </ul>
      </section>
    );
  };

  const renderBottomBar = () => {
    return <components.BottomTabBar />;
  };

  return (
    <components.MotionWrapper>
      <components.SafeAreaView>
        {renderHeader()}
        {renderSearch()}
        {renderContent()}
        {renderBottomBar()}
        <components.SafeAreaInsetBottom />
      </components.SafeAreaView>
    </components.MotionWrapper>
  );
};
