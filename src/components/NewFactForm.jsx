import { useState } from 'react';
import { CATEGORIES } from '../utils/config';
import supabase from '../supabase';

const NewFactForm = ({ setShowForm, setFacts }) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  const handleSubmit = async (e) => {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new fact
    if (text && source && category && textLength <= 200) {
      // 3. Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset input fields
      setText('');
      setSource('');
      setCategory('');

      // 6. Close the form
      setShowForm(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-stone-700 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 rounded-2xl mb-10 sm:px-6 px-4 py-4'
    >
      <div className='flex items-center gap-4 grow'>
        <input
          required
          type='text'
          placeholder='Share a fact with the world...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
          className='lg:w-56 w-full sm:h-[55px] h-[38px] bg-stone-500 outline-none rounded-full px-3 py-1 sm:px-4 sm:py-3 text-lg placeholder-stone-400 border border-stone-500 focus:outline-none focus:border-stone-50 transition-all duration-300 grow'
        />

        <span className='font-semibold sm:text-lg text-base lg:mr-4 mr-0'>
          {200 - textLength}
        </span>
      </div>

      <input
        required
        type='url'
        placeholder='Trustworthy source...'
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
        className='lg:w-56 w-full sm:h-[55px] h-[38px] bg-stone-500 outline-none rounded-full px-3 py-1 sm:px-4 sm:py-3 text-lg placeholder-stone-400 border border-stone-500 focus:outline-none focus:border-stone-50 transition-all duration-300'
      />

      <select
        required
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
        className='lg:w-56 w-full sm:h-[55px] h-[38px] bg-stone-500 outline-none rounded-full px-3 py-1 sm:px-4 sm:py-3 text-lg placeholder-stone-400 border border-stone-500 focus:outline-none focus:border-stone-50 transition-all duration-300'
      >
        <option value=''>Choose category</option>
        {CATEGORIES.map((item) => (
          <option value={item.name} key={item.name}>
            {item.name.toUpperCase()}
          </option>
        ))}
      </select>

      <button
        disabled={isUploading}
        className='btn-gradient font-coiny !leading-none uppercase text-lg sm:px-8 sm:pt-5 sm:pb-[17px] px-3 pt-2 pb-3 rounded-full transition-all duration-300 sm:hover:scale-110 hover:-rotate-2 hover:scale-105'
      >
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
