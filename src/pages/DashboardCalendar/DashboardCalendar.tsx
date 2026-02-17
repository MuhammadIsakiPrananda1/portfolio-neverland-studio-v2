import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Event {
  id: number;
  title: string;
  time: string;
  date: number;
  type: 'meeting' | 'deadline' | 'milestone';
  participants?: string[];
}

const defaultEvents: Event[] = [
  { id: 1, title: 'Client Meeting - Tokopedia', time: '10:00 AM', date: 17, type: 'meeting', participants: ['Sarah', 'Ahmad'] },
  { id: 2, title: 'Security Audit Deadline', time: '11:59 PM', date: 18, type: 'deadline' },
  { id: 3, title: 'Project Kickoff - Gojek', time: '2:00 PM', date: 19, type: 'meeting', participants: ['Budi', 'Rendy'] },
  { id: 4, title: 'Cloud Migration Milestone', time: '5:00 PM', date: 20, type: 'milestone' },
  { id: 5, title: 'Team Standup', time: '9:00 AM', date: 21, type: 'meeting', participants: ['All Team'] },
  { id: 6, title: 'Compliance Report Due', time: '11:59 PM', date: 22, type: 'deadline' },
];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DashboardCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(17);
  const [events] = useState<Event[]>(defaultEvents);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day: number) => events.filter(e => e.date === day);

  const getTypeColor = (type: string) => {
    if (type === 'meeting') return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    if (type === 'deadline') return 'bg-red-500/20 border-red-500/30 text-red-400';
    return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5">
                  <CalendarIcon className="w-3 h-3 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Calendar</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black mb-2">
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                  Calendar & Events
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                View your schedule, meetings, and deadlines.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 glass rounded-xl border border-white/10 p-6" variants={staggerContainer} initial="hidden" animate="visible">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{monthNames[month]} {year}</h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              const isSelected = day === selectedDate;

              return (
                <motion.button
                  key={day}
                  variants={staggerItem}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 rounded-lg text-sm relative transition-all ${isToday ? 'bg-primary/20 border border-primary/50' : isSelected ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <span className={`${isToday || isSelected ? 'text-white' : 'text-gray-400'}`}>{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((e, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full ${e.type === 'meeting' ? 'bg-blue-400' : e.type === 'deadline' ? 'bg-red-400' : 'bg-purple-400'}`} />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="glass rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Events for {monthNames[month]} {selectedDate}</h2>
          <div className="space-y-3">
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className="text-gray-500 text-sm">No events on this day</p>
            ) : (
              getEventsForDate(selectedDate).map(event => (
                <motion.div key={event.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`p-3 rounded-lg border ${getTypeColor(event.type)}`}>
                  <div className="flex items-start gap-2">
                    {event.type === 'meeting' ? <Video className="w-4 h-4 mt-0.5" /> : event.type === 'deadline' ? <Clock className="w-4 h-4 mt-0.5" /> : <MapPin className="w-4 h-4 mt-0.5" />}
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{event.title}</h3>
                      <p className="text-xs opacity-70 mt-1">{event.time}</p>
                      {event.participants && (
                        <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                          <Users className="w-3 h-3" />
                          {event.participants.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
