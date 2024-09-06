"use client";
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const ResignationPointsCard = () => {
  const [points, setPoints] = useState(0);
  const [dates, setDates] = useState(['']);
  
  useEffect(() => {
    const storedPoints = localStorage.getItem('resignationPoints');
    const storedDates = JSON.parse(localStorage.getItem('resignationDates') ?? '[]');
    if (storedPoints) setPoints(parseInt(storedPoints));
    if (storedDates) setDates(storedDates);
  }, []);

  const handleAddPoint = () => {
    if (points < 100) {
      const newPoints = points + 1;
      const newDate = new Date().toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
      const newDates = [...dates, newDate];
      setPoints(newPoints);
      setDates(newDates);
      localStorage.setItem('resignationPoints', newPoints);
      localStorage.setItem('resignationDates', JSON.stringify(newDates));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-end">
        <h1 className="text-2xl font-bold">離職集點卡</h1>
        <span className="ml-4 text-sm text-gray-400">共100格，集滿離職</span>
      </div>
      <p className="mb-4">Your name</p>
      <div className="grid grid-cols-10 gap-2 mb-4">
        {[...Array(100)].map((_, index) => (
          <div
            key={index}
            className={`aspect-video border relative bg-gray-100`}
          >
            {index < points && (
              <>
                <img src="https://fakeimg.pl/79x44/" alt="Point" className="w-full h-full object-cover" />
                <span className="absolute top-0 right-0 text-sm text-black font-bold">
                  {dates[index]}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded">集點</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認集點</AlertDialogTitle>
            <AlertDialogDescription>
              確定要累積一點嗎？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddPoint}>確認</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {points >= 100 && (
        <div className="mt-4 text-xl font-bold text-green-600">
          恭喜離職！
        </div>
      )}
      <p className="mt-4">真的做不了，沒有一天是適合上班的。</p>
    </div>
  );
};

export default ResignationPointsCard;
