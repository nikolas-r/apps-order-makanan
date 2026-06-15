'use client';

import React from 'react';
import Link from 'next/link';

import { svg } from '@/assets/svg';
import { DishType } from '@/types';
import { constants } from '@/constants';
import { components } from '@/components';
import { useAppSelector } from '@/lib/store';
import { useAppDispatch } from '@/lib/store';
import { cartActions } from '@/lib/cartSlice';

type Props = {
  dish: DishType;
};

export const RecommendedItem: React.FC<Props> = ({ dish }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.list);
  const inCart = cart.find((item) => item.id === dish?.id);
  const quantity = inCart ? inCart.quantity : 0;

  const getWords = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 3) return text;
    return words.slice(0, 3).join(' ') + '…';
  };

  return (
    <li
      style={{
        gap: 16,
        ...constants.flex.flexRow,
        borderRadius: 5,
        width: '100%',
        height: 120,
        position: 'relative',
        backgroundColor: constants.colors.whiteColor,
      }}
    >
      <Link
        href={`${constants.routes.dish}/${dish.id}`}
        style={{
          height: '100%',
          width: 124,
          position: 'relative',
        }}
      >
        <img
          src={dish.img}
          alt={dish.name}
          style={{
            width: 124,
            height: '100%',
            borderRadius: '5px 0 0 5px',
            objectFit: 'cover',
          }}
        />
      </Link>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          marginRight: 20,
        }}
      >
        <h4
          style={{
            marginBottom: 2,
            textTransform: 'capitalize',
            ...constants.typography.h4,
          }}
        >
          {dish.name}
        </h4>
        <p
          style={{
            fontSize: 12,
            color: constants.colors.textColor,
            marginBottom: 4,
          }}
          className="number-of-lines-1"
        >
          {getWords(dish.ingredients?.join(', ') || 'No ingredients')}
        </p>
        <p
          style={{
            fontSize: 14,
            marginBottom: 8,
            fontWeight: 600,
            color: constants.colors.textColor,
          }}
        >
          {dish.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
        </div>
        <button
          style={{
            width: 26,
            height: 26,
            backgroundColor: quantity ? constants.colors.mainColor : '#EEF3FC',
            borderRadius: 4,
            ...constants.flex.columnCenterCenter,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch(cartActions.addToCart(dish));
          }}
        >
          {quantity! > 0 && (
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: constants.colors.whiteColor,
              }}
            >
              {quantity}
            </span>
          )}
          {!quantity && <svg.PlusSvg />}
        </button>
      </div>
    </li>
  );
};
