'use client';

import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react';

import {hooks} from '@/hooks';
import {constants} from '@/constants';
import {components} from '@/components';
import {useAppSelector} from '@/lib/store';

export const Checkout: React.FC = () => {
  hooks.useThemeColor('#EEF3FC');
  hooks.useBodyColor('#EEF3FC');

  const router = useRouter();
  const [buttonSectionHeight, setButtonSectionHeight] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  
  const cart = useAppSelector((state) => state.cart.list);
  const total = useAppSelector((state) => state.cart.total);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonSectionHeight(buttonRef.current.offsetHeight);
    }
  }, []);

  const {form, handleChangeField} = hooks.useFormField({
    fullName: '',
    address: '',
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePlaceOrder = async () => {
    if (!form.fullName) {
      alert("Mohon isi Nama Anda.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDishes = cart.map((item: any) => ({
        name: item.name, 
        quantity: item.quantity || 1, 
        price: item.price,
      }));

      const orderData = {
        customerName: form.fullName,
        dishes: orderDishes,
        totalPrice: total
      };

      const response = await axios.post('/api/orders', orderData);

      if (response.data.success) {
        router.push(constants.routes.OrderSuccess);
      } else {
        alert("Gagal menyimpan pesanan.");
      }
    } catch (error) {
      console.error("Error Axios:", error);
      alert("Terjadi kesalahan jaringan saat memproses pesanan Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderHeader = () => {
    return <components.Header showGoBack={true} title="Checkout" />;
  };

  const renderShippingDetails = () => {
    return (
      <section style={{marginBottom: 30}}>
        <h4 style={{marginBottom: 14, ...constants.typography.h4}}>
          Shipping Details
        </h4>
        <div style={{...constants.flex.flexColumn, gap: 20}}>
          <components.Input
            label="Name"
            placeholder="Nikolas Reinald"
            value={form.fullName}
            onClickAction={() => handleChangeField('fullName', 'fullName')}
          />
          <components.Input
            label="Address"
            placeholder="Jl. Margonda Raya No.358, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423"
            value={form.address}
            onClickAction={() => handleChangeField('address', 'address')}
          />
          <components.Input
            label="Phone Number"
            placeholder="+62 812-3456-7890"
            value={form.phoneNumber}
            onClickAction={() =>
              handleChangeField('phoneNumber', 'phoneNumber')
            }
          />
        </div>
      </section>
    );
  };

  const renderCardDetails = () => {
    return (
      <section style={{marginBottom: 20}}>
        <h4 style={{marginBottom: 14, ...constants.typography.h4}}>
          Card Details
        </h4>
        <div style={{...constants.flex.flexColumn, gap: 20}}>
          <components.Input
            label="Card Number"
            value={form.cardNumber}
            placeholder="7741 ******** 6644"
            onClickAction={() => handleChangeField('cardNumber', 'Card Number')}
          />
          <components.Input
            label="Expiry Date"
            value={form.expiryDate}
            placeholder="01/26"
            onClickAction={() => handleChangeField('expiryDate', 'MM/YY')}
          />
          <components.Input
            label="CVV"
            value={form.cvv}
            placeholder="123"
            onClickAction={() => handleChangeField('cvv', 'CVV')}
          />
        </div>
      </section>
    );
  };

  const renderButton = () => {
    return (
      <div
        ref={buttonRef}
        style={{
          padding: 20,
          backgroundColor: constants.colors.whiteColor,
          borderTop: '1px solid #E2E2E2',
          position: 'fixed',
          bottom: 'env(safe-area-inset-bottom)',
          left: 0,
          right: 0,
        }}
      >
        <components.Button
          label={isSubmitting ? "Processing..." : "Place Order"}
          onClickAction={() => {
            if (!isSubmitting) handlePlaceOrder();
          }}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <main
        style={{
          marginTop: constants.sizes.headerHeight,
          marginBottom: buttonSectionHeight,
          padding: 20,
          overflowY: 'auto',
        }}
      >
        {renderShippingDetails()}
        {renderCardDetails()}
        <components.SafeAreaInsetBottom />
      </main>
    );
  };

  return (
    <components.MotionWrapper>
      <components.SafeAreaView>
        {renderHeader()}
        {renderContent()}
        {renderButton()}
      </components.SafeAreaView>
    </components.MotionWrapper>
  );
};