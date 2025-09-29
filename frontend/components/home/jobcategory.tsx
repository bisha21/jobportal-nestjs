'use client';

import CarouselWrapper from "../reusable/carousel";

const jobCategories = [
  { id: 1, title: 'Software Development', icon: '💻' },
  { id: 2, title: 'Design & Creative', icon: '🎨' },
  { id: 3, title: 'Marketing', icon: '📢' },
  { id: 4, title: 'Finance', icon: '💰' },
  { id: 5, title: 'Healthcare', icon: '⚕️' },
];

export default function JobCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-2xl font-bold text-center mb-6">💼 Job Categories</h2>
      <CarouselWrapper
        items={jobCategories}
        renderItem={(category) => (
          <div className="bg-indigo-50 shadow rounded-xl flex flex-col items-center justify-center p-6 text-indigo-700">
            <span className="text-4xl">{category.icon}</span>
            <p className="mt-3 font-semibold">{category.title}</p>
          </div>
        )}
      />
    </section>
  );
}
