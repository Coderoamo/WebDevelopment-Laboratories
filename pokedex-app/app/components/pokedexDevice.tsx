'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type PokemonDetail = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};

export default function PokedexDevice() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when pokemonId changes
  useEffect(() => {
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  const goToPrevious = () => {
    setPokemonId((prev) => (prev === 1 ? 151 : prev - 1));
  };

  const goToNext = () => {
    setPokemonId((prev) => (prev === 151 ? 1 : prev + 1));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      {/* Pokédex Device Frame */}
      <div className="relative w-full max-w-md bg-red-600 rounded-3xl shadow-2xl p-6 border-8 border-red-800">
        {/* Top light / indicator */}
        <div className="flex gap-2 mb-4">
          <div className="w-4 h-4 bg-blue-400 rounded-full shadow-inner"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full shadow-inner"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-inner"></div>
        </div>

        {/* Screen Area */}
        <div className="bg-white rounded-xl p-4 shadow-inner border-4 border-gray-300 min-h-[400px] flex flex-col items-center">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-8">
              Error: {error}
              <button
                onClick={() => fetchPokemon(pokemonId)}
                className="block mx-auto mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && pokemon && (
            <>
              {/* Pokémon Image */}
              <div className="relative w-48 h-48 mx-auto">
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>

              {/* Pokémon Name */}
                <h2 className="text-3xl font-bold capitalize mt-4 text-center text-blue-600">
                    {pokemon.name}
                </h2>

              {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Height</p>
                        <p className="font-semibold text-lg text-green-600">{pokemon.height / 10} m</p>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-gray-500 text-sm">Weight</p>
                    <p className="font-semibold text-lg text-orange-600">{pokemon.weight / 10} kg</p>
                </div>
            </div>

              {/* ID Display */}
              <p className="text-gray-400 text-sm mt-4">#{pokemonId.toString().padStart(3, '0')}</p>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={goToPrevious}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={goToNext}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        {/* D-pad style (optional decoration) */}
        <div className="flex justify-center mt-4 gap-2">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}