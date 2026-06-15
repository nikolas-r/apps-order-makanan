'use client';

import React from 'react';

import { hooks } from '@/hooks';
import { items } from '@/items';
import { DishType } from '@/types';
import { constants } from '@/constants';
import { components } from '@/components';

export const Home: React.FC = () => {
  const { dishes, loading: isLoading } = hooks.useGetDishes();


  const renderHeader = () => {
    return (
      <components.Header
        showBasket={true}
        title="Amour Èternel"
        showUser={true}
        titleStyle={{ fontWeight: 500 }}
      />
    );
  };

  const renderProducts = () => {
    return (
      <section>
        <ul
          style={{
            ...constants.flex.flexColumn,
            paddingLeft: 20,
            paddingRight: 20,
            gap: 14,
          }}
        >
          {dishes
            .map((dish: DishType) => {
              return <items.RecommendedItem dish={dish} key={dish.id} />;
            })}
        </ul>
      </section>
    )
  }

  const renderContent = () => {
    return (
      <main
        style={{
          overflowY: 'auto',
          marginTop: constants.sizes.headerHeight,
          marginBottom: constants.sizes.tabBarHeight,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {renderProducts()}
      </main>
    );
  };

  const renderBottomBar = () => {
    return <components.BottomTabBar />;
  };

  return (
    <components.MotionWrapper>
      <components.SafeAreaView>
        {renderHeader()}
        {renderContent()}
        {renderBottomBar()}
        <components.SafeAreaInsetBottom />
      </components.SafeAreaView>
    </components.MotionWrapper>
  );
};
