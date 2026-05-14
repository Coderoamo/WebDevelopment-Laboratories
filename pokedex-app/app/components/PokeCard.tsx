'use client';

import { useState } from 'react';
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

type PokemonCardProps = {
  name: string;
  id: number;
};

export default function PokemonCard({ name, id }: PokemonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCardClick = async () => {
    setIsModalOpen(true);
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemonDetail(data);
    } catch (error) {
      console.error('Failed to fetch Pokemon details:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPokemonDetail(null);
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={handleCardClick}
        className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
          width={128}
          height={128}
          className="w-32 h-32 object-contain mx-auto"
        />
        <p className="text-center mt-2 capitalize font-semibold">{name}</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : pokemonDetail ? (
              <>
                <div className="flex justify-center">
                  <Image
                    src={pokemonDetail.sprites.other['official-artwork'].front_default}
                    alt={pokemonDetail.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center mt-4 capitalize">
                  {pokemonDetail.name}
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Height</p>
                    <p className="font-semibold text-lg">
                      {pokemonDetail.height / 10} m
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Weight</p>
                    <p className="font-semibold text-lg">
                      {pokemonDetail.weight / 10} kg
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-red-500">
                Failed to load Pokémon details.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}