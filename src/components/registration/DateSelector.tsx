
import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const DateSelector = ({ value, onChange, error }: DateSelectorProps) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Initialize values from props
  React.useEffect(() => {
    if (value) {
      // Parse the date string directly without creating a Date object to avoid timezone issues
      const dateParts = value.split('-');
      if (dateParts.length === 3) {
        setYear(dateParts[0]);
        setMonth(dateParts[1]);
        setDay(dateParts[2]);
      }
    }
  }, [value]);

  // Generate options
  const days = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const dayNum = i + 1;
      return {
        value: dayNum.toString().padStart(2, '0'),
        label: dayNum.toString()
      };
    });
  }, []);

  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1915;
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
      const yearNum = currentYear - i;
      return {
        value: yearNum.toString(),
        label: yearNum.toString()
      };
    });
  }, []);

  const updateDate = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      const dateString = `${newYear}-${newMonth}-${newDay}`;
      console.log('DateSelector updating date to:', dateString);
      onChange(dateString);
    }
  };

  const handleDayChange = (newDay: string) => {
    console.log('Day changed to:', newDay);
    setDay(newDay);
    updateDate(newDay, month, year);
  };

  const handleMonthChange = (newMonth: string) => {
    console.log('Month changed to:', newMonth);
    setMonth(newMonth);
    updateDate(day, newMonth, year);
  };

  const handleYearChange = (newYear: string) => {
    console.log('Year changed to:', newYear);
    setYear(newYear);
    updateDate(day, month, newYear);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <Select value={day} onValueChange={handleDayChange}>
          <SelectTrigger className={error ? 'border-orange-500' : ''}>
            <SelectValue placeholder="Dia" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
            {days.map((dayOption) => (
              <SelectItem key={dayOption.value} value={dayOption.value} className="hover:bg-gray-100">
                {dayOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={month} onValueChange={handleMonthChange}>
          <SelectTrigger className={error ? 'border-orange-500' : ''}>
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
            {months.map((monthOption) => (
              <SelectItem key={monthOption.value} value={monthOption.value} className="hover:bg-gray-100">
                {monthOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={handleYearChange}>
          <SelectTrigger className={error ? 'border-orange-500' : ''}>
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
            {years.map((yearOption) => (
              <SelectItem key={yearOption.value} value={yearOption.value} className="hover:bg-gray-100">
                {yearOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && (
        <p className="text-orange-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default DateSelector;
