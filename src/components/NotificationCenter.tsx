import React, { useState } from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  Package,
  Sparkles,
  ShieldCheck,
  Truck,
  X,
  ExternalLink,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppNotification } from '../data/notifications';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
  onTrackOrder: (code: string) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenPolicy?: (policyName: string) => void;
  onCloseDrawer?: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onTrackOrder,
  onNavigateSection,
  onOpenPolicy,
  onCloseDrawer,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'order' | 'promotion' | 'alert'>('all');
  const [isExpanded, setIsExpanded] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handleActionClick = (notif: AppNotification) => {
    onMarkAsRead(notif.id);

    if (notif.actionType === 'track' && notif.orderCode) {
      onTrackOrder(notif.orderCode);
    } else if (notif.actionType === 'shop') {
      if (onNavigateSection) {
        onNavigateSection('bestsellers');
      }
      if (onCloseDrawer) {
        onCloseDrawer();
      }
    } else if (notif.actionType === 'policy') {
      if (onOpenPolicy) {
        onOpenPolicy('Shipping & Delivery');
      }
    }
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order':
        return <Truck size={14} className="text-[#063B2B]" />;
      case 'promotion':
        return <Sparkles size={14} className="text-[#C9A45C]" />;
      case 'alert':
        return <ShieldCheck size={14} className="text-[#063B2B]" />;
      default:
        return <Bell size={14} className="text-[#786851]" />;
    }
  };

  return (
    <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/70 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#D8CDBD]/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell size={15} className="text-[#063B2B]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A45C] ring-2 ring-[#FAF7F2] animate-pulse" />
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#063B2B]">
            Notification Center
          </span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 bg-[#063B2B] text-[#FAF7F2] text-[9px] font-mono font-bold rounded-xs">
              {unreadCount} NEW
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[10px] uppercase tracking-wider text-[#786851] hover:text-[#063B2B] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Mark all notifications as read"
            >
              <CheckCheck size={12} className="text-[#C9A45C]" />
              <span className="hidden sm:inline">Mark All Read</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] text-[#786851] hover:text-[#17140F] transition-colors p-1"
            aria-label={isExpanded ? 'Collapse notifications' : 'Expand notifications'}
          >
            {isExpanded ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-sans">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'order', label: 'Orders' },
                { id: 'promotion', label: 'Privileges' },
                { id: 'alert', label: 'Security' },
              ] as const
            ).map((tab) => {
              const count =
                tab.id === 'all'
                  ? notifications.length
                  : notifications.filter((n) => n.type === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id)}
                  className={`px-2.5 py-1 uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer rounded-xs border ${
                    filterType === tab.id
                      ? 'bg-[#063B2B] text-[#FAF7F2] border-[#063B2B]'
                      : 'bg-[#FAF7F2] text-[#786851] border-[#D8CDBD]/70 hover:border-[#063B2B]'
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div className="p-4 bg-[#FAF7F2] border border-[#D8CDBD]/40 text-center text-xs text-[#786851]">
              <Check size={18} className="mx-auto text-[#063B2B] mb-1" />
              <p className="font-medium text-[#17140F]">All caught up!</p>
              <p className="text-[11px] mt-0.5 text-[#786851]/80">
                No active updates in this section right now.
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <AnimatePresence>
                {filteredNotifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`p-3 bg-[#FAF7F2] border transition-all duration-200 relative group rounded-xs ${
                      notif.read
                        ? 'border-[#D8CDBD]/40 opacity-85'
                        : 'border-[#063B2B]/40 shadow-xs'
                    }`}
                  >
                    {/* Unread indicator dot */}
                    {!notif.read && (
                      <span className="absolute top-3 right-8 w-2 h-2 rounded-full bg-[#C9A45C]" />
                    )}

                    {/* Top Row: Type, Title, Timestamp */}
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#F5EFE4] border border-[#D8CDBD]/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {getIcon(notif.type)}
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-serif text-xs font-semibold text-[#17140F] leading-tight">
                            {notif.title}
                          </h4>
                          {notif.badge && (
                            <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#F5EFE4] text-[#063B2B] border border-[#D8CDBD]/50 font-semibold font-mono">
                              {notif.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#786851] block mt-0.5">
                          {notif.timestamp}
                        </span>
                      </div>

                      {/* Dismiss button */}
                      <button
                        type="button"
                        onClick={() => onDismiss(notif.id)}
                        className="text-[#786851]/60 hover:text-[#991B1B] p-1 transition-colors -mt-1 -mr-1"
                        title="Dismiss notification"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    {/* Message */}
                    <p className="text-[11px] text-[#786851] font-sans leading-relaxed pl-8 mb-2">
                      {notif.message}
                    </p>

                    {/* Action Row */}
                    <div className="pl-8 flex items-center justify-between pt-1 border-t border-[#D8CDBD]/30 text-[10px]">
                      {notif.actionText ? (
                        <button
                          type="button"
                          onClick={() => handleActionClick(notif)}
                          className="text-[#063B2B] hover:text-[#C9A45C] font-semibold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>{notif.actionText}</span>
                          <ArrowRight size={10} />
                        </button>
                      ) : (
                        <span />
                      )}

                      {!notif.read && (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(notif.id)}
                          className="text-[#786851] hover:text-[#063B2B] font-medium transition-colors cursor-pointer"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
};
