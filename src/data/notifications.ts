import { OrderRecord } from '../firebase/context';

export interface AppNotification {
  id: string;
  type: 'order' | 'promotion' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  orderCode?: string;
  actionText?: string;
  actionType?: 'track' | 'shop' | 'policy';
  badge?: string;
}

export const STATIC_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-promo-1',
    type: 'promotion',
    title: 'Collector Privilege: Atelier Keepsake Casing',
    message: 'Receive a complimentary bespoke velvet travel jewellery box with any 9-karat order above ₹15,000.',
    timestamp: '2 hours ago',
    read: false,
    actionText: 'View Bestsellers',
    actionType: 'shop',
    badge: 'Exclusive Privilege',
  },
  {
    id: 'notif-promo-2',
    type: 'promotion',
    title: 'Blush 9K Rose Gold Now Available',
    message: 'Select our new 375 blush rose gold tone in your account settings for tailored shopping recommendations.',
    timestamp: '1 day ago',
    read: false,
    actionText: 'Update Settings',
    actionType: 'shop',
    badge: 'New Alloy',
  },
  {
    id: 'notif-alert-1',
    type: 'alert',
    title: 'BIS 375 Hallmarking Guarantee',
    message: 'Every NINE creation undergoes assay testing to ensure precise 37.5% gold purity with certified bullion authenticity.',
    timestamp: '2 days ago',
    read: false,
    actionText: 'Security Protocol',
    actionType: 'policy',
    badge: 'Purity Standard',
  },
  {
    id: 'notif-alert-2',
    type: 'alert',
    title: 'Doorstep Armored Delivery with OTP',
    message: 'All parcels are transported in tamper-evident sealed packaging. Please keep your delivery OTP handy upon arrival.',
    timestamp: '3 days ago',
    read: true,
    actionText: 'Courier Details',
    actionType: 'policy',
    badge: 'Transit Protection',
  },
];

export function getNotificationsWithOrders(
  userOrders: OrderRecord[],
  readIds: string[],
  dismissedIds: string[]
): AppNotification[] {
  const dynamicOrderNotifs: AppNotification[] = userOrders.map((order) => {
    const isDelivered = order.status === 'delivered';
    const isDispatched = order.status === 'dispatched';
    
    return {
      id: `order-notif-${order.id}`,
      type: 'order',
      title: isDelivered
        ? `Delivered: Order ${order.orderCode}`
        : isDispatched
        ? `In Transit: Order ${order.orderCode}`
        : `Order Confirmed: ${order.orderCode}`,
      message: isDelivered
        ? `Your 9K solid gold parcel has been successfully delivered and handed over.`
        : isDispatched
        ? `Your parcel is traveling via armored courier logistics with live milestone tracking.`
        : `Your jewellery order has been confirmed at our Thrissur atelier for 375 hallmark assaying.`,
      timestamp: new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      }),
      read: readIds.includes(`order-notif-${order.id}`),
      orderCode: order.orderCode,
      actionText: 'Track Consignment',
      actionType: 'track',
      badge: order.status.toUpperCase(),
    };
  });

  const all = [...dynamicOrderNotifs, ...STATIC_NOTIFICATIONS]
    .filter((n) => !dismissedIds.includes(n.id))
    .map((n) => ({
      ...n,
      read: readIds.includes(n.id) || n.read,
    }));

  return all;
}
