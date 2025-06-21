'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Order, CartItem, ShippingAddress } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { decrementStock } from '@/services/product-service';

type OrderContextType = {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, userEmail: string, shippingAddress: ShippingAddress) => void;
  getOrdersForUser: (userEmail: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
      localStorage.removeItem('orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        console.error("Failed to save orders to localStorage", error);
      }
    }
  }, [orders, isLoading]);

  const addOrder = (items: CartItem[], total: number, userEmail: string, shippingAddress: ShippingAddress) => {
    const newOrder: Order = {
      id: uuidv4(),
      userEmail,
      items,
      total,
      date: new Date().toISOString(),
      status: 'Pending',
      shippingAddress,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);

    decrementStock(items).catch(error => {
      console.error("Failed to update stock after order:", error);
      // In a real application, you might want to add a retry mechanism or flag this for manual review.
    });
  };

  const getOrdersForUser = (userEmail: string) => {
    return orders.filter(order => order.userEmail === userEmail);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
        prevOrders.map(order =>
            order.id === orderId ? { ...order, status } : order
        )
    );
  };

  if (isLoading) {
      return null;
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrdersForUser, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
