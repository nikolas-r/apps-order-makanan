'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { constants } from '@/constants';
import { components } from '@/components';

import useGetHistory from '@/hooks/useGetHistory';

export const OrderHistory: React.FC = () => {
  const [openId, setOpenId] = useState<String | null>(null);
  const { history, isLoading } = useGetHistory();

  const renderHeader = () => {
    return <components.Header title="Order History" showGoBack={true} />;
  };

  const renderContent = () => {
    return (
      <main
        style={{
          overflowY: 'auto',
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: constants.sizes.headerHeight,
          paddingTop: 18,
          paddingBottom: 20,
        }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {history.map((item: any) => (
            <li
              key={item._id}
              style={{
                backgroundColor: constants.colors.whiteColor,
                borderRadius: 5,
              }}
              onClick={() => setOpenId(openId === item._id ? null : item._id)}
            >
              <section
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${openId === item._id ? '#EEEEEE' : 'transparent'
                    }`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: constants.colors.textColor,
                    }}
                  >
                    {item.createdAt}
                  </span>
                  <h5 style={{ fontSize: 14 }}>{item.customerName}</h5>
                  <span
                    style={{
                      fontSize: 12,
                      color: constants.colors.mainDarkColor,
                    }}
                  >
                    {item.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </span>
                </div>
              </section>
              <AnimatePresence initial={false}>
                {openId === item._id && (
                  <motion.section
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
                  >
                    <ul
                      style={{
                        padding: 20,
                        gap: 6,
                        ...constants.flex.flexColumn,
                      }}
                    >
                      {item.dishes.map((product: any) => {
                        return (
                          <li
                            key={product.id}
                            style={{
                              ...constants.flex.rowCenterBetween,
                            }}
                          >
                            <span style={{ fontSize: 14 }}>{product.name}</span>
                            <span style={{ fontSize: 14 }}>
                              {product.quantity} x {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.section>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </main>
    );
  };

  return (
    <components.MotionWrapper>
      <components.SafeAreaView>
        {renderHeader()}
        {renderContent()}
      </components.SafeAreaView>
    </components.MotionWrapper>
  );
};
