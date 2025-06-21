
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const DateSelector = ({ value, onChange, error }: DateSelectorProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1914 }, (_, i) => currentYear - i);
  
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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [day, month, year] = value ? value.split('-').reverse() : ['', '', ''];

  const handleDateChange = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      const formattedDate = `${newYear}-${newMonth.padStart(2, '0')}-${newDay.padStart(2, '0')}`;
      onChange(formattedDate);
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Select 
            value={day} 
            onValueChange={(newDay) => handleDateChange(newDay, month, year)}
          >
            <SelectTrigger className={error ? 'border-orange-500' : ''}>
              <SelectValue placeholder="Dia" />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={d.toString()}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={month} 
            onValueChange={(newMonth) => handleDateChange(day, newMonth, year)}
          >
            <SelectTrigger className={error ? 'border-orange-500' : ''}>
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select 
            value={year} 
            onValueChange={(newYear) => handleDateChange(day, month, newYear)}
          >
            <SelectTrigger className={error ? 'border-orange-500' : ''}>
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && (
        <p className="text-orange-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default DateSelector;
