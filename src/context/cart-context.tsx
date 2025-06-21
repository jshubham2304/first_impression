'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem, Product, ColorVariant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, variant: ColorVariant, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, variant: ColorVariant, quantity: number) => {
    const existingItem = cartItems.find(item => item.productId === product.id && item.variant.hex === variant.hex);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > variant.stock) {
        toast({
          title: "Not Enough Stock",
          description: `You can't have more than ${variant.stock} of this item in your cart.`,
          variant: "destructive",
        });
        return; 
      }
      setCartItems(cartItems.map(item =>
        item.id === existingItem.id ? { ...item, quantity: newQuantity } : item
      ));
    } else {
      if (quantity > variant.stock) {
        toast({
          title: "Not Enough Stock",
          description: `Only ${variant.stock} of this item is available.`,
          variant: "destructive",
        });
        return;
      }
      const newItem: CartItem = {
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        variant,
        imageUrl: product.imageUrl,
        imageHint: product.imageHint,
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} (${variant.name}) has been added to your cart.`,
    });
  };
  
  const removeFromCart = (cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      variant: 'destructive',
    });
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    const itemToUpdate = cartItems.find(item => item.id === cartItemId);
    if (!itemToUpdate) return;

    if (newQuantity <= 0) {
        removeFromCart(cartItemId);
        return;
    }
    
    if (newQuantity > itemToUpdate.variant.stock) {
        toast({
            title: 'Not Enough Stock',
            description: `Only ${itemToUpdate.variant.stock} available.`,
            variant: 'destructive',
        });
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === cartItemId ? { ...item, quantity: itemToUpdate.variant.stock } : item
            )
        );
        return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
