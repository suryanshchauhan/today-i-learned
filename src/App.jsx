import { useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import FactList from './components/FactList';
import Loader from './components/Loader';
import NewFactForm from './components/NewFactForm';
import supabase from './supabase';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');

  // Fetch facts data from the supabase
  useEffect(() => {
    const getFacts = async () => {
      // 1. Loader until facts data fetched
      setIsLoading(true);

      // 2. Fetching facts data from supabase asynchronously
      let query = supabase.from('facts').select('*');

      if (currentCategory !== 'all')
        query = query.eq('category', currentCategory);

      const { data: facts, error } = await query
        .order('votesInteresting', { ascending: false }) // order facts by 'interesting votes' from high to low
        .limit(1000); // limit the facts to 1000 if there are more than that then we'll implement pagination

      // 3. Handle error
      if (!error) setFacts(facts);
      else alert('There was a problem getting data');

      // 4. Set Loader back to 'false' because facts data have fetched
      setIsLoading(false);
    };
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      <main className='mx-auto max-w-[1440px]'>
        <div className='px-4 sm:px-6 lg:px-8 pt-28 sm:h-screen h-auto'>
          {/* New Fact Form */}
          {showForm ? (
            <NewFactForm setShowForm={setShowForm} setFacts={setFacts} />
          ) : null}

          <div className='grid sm:grid-cols-[250px_minmax(0,_1fr)] grid-cols-1 sm:gap-12 gap-6 pb-10'>
            <CategoryFilter setCurrentCategory={setCurrentCategory} />

            {isLoading ? (
              <Loader />
            ) : (
              <FactList facts={facts} setFacts={setFacts} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
