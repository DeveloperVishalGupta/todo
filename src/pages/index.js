
import Image from "next/image";
import { useState } from "react";
import Icons from "@/model/enum/icons";
import celebrities from '@/celebrities.json';
import { Modal } from "@/components/model";


export default function Home() {
  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
  const [initialCelebritiesData] = useState(celebrities);
  const [celebritiesData, setCelebritiesData] = useState(celebrities);
  const [seachBox, setSearchBox] = useState(null)
  const [inputValue, setInputValue] = useState({});
  const [inputFieldDisable, setInputFieldDisable] = useState({});
  const [cardOpen, setCardOpen] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    console.log(item);

    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  const handleDelete = (id) => {
    const updatedCelebrities = celebritiesData.filter((celeb) => celeb.id !== id);
    setCelebritiesData(updatedCelebrities);
  };

  const initializeState = (celebrity) => ({
    [`cardName_${celebrity.id}`]: `${celebrity.first} ${celebrity.last}`,
    [`age_${celebrity.id}`]: getAge(celebrity.dob),
    [`gender_${celebrity.id}`]: celebrity.gender,
    [`country_${celebrity.id}`]: celebrity.country,
    [`description_${celebrity.id}`]: celebrity.description || defaultContent,
  });


  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [`${name}_${id}`]: value,
    }));
  };

  const handleSave = (id) => {
    console.log("Saved value:", inputValue[`cardName_${id}`]);
  };

  const cardEdit = (id) => {
    setInputFieldDisable((prev) => ({
      ...prev,
      [id]: false,
    }));
  };


  const searchBar = (e) => {
    const searchText = e.target.value.toLowerCase();

    if (!searchText) {
      setCelebritiesData(initialCelebritiesData);
    } else {
      const filteredData = initialCelebritiesData.filter(person =>
        person.first.toLowerCase().startsWith(searchText)
      );
      setCelebritiesData(filteredData);
    }
  };

  return (
    <div className="grid justify-items-center p-4">
      <div className="md:w-1/2 lg:w-5/12 xl:w-1/4">
        <div className="border rounded-lg flex items-center px-4">
          <span>
            {Icons.getComponent(Icons.MAGNIFYING_GLASS)}
          </span>
          <input
            name="seachBox"
            placeholder="Search.."
            className={`font-semibold py-2 px-4`}
            value={seachBox}
            onChange={(e) => searchBar(e)}
          />
        </div>
        {celebritiesData.map((celebrity) => {
          const id = celebrity.id;
          if (!inputValue[`cardName_${id}`]) {
            setInputValue((prev) => ({
              ...prev,
              ...initializeState(celebrity),
            }));
            setInputFieldDisable((prev) => ({ ...prev, [id]: true }));
            setCardOpen((prev) => ({ ...prev, [id]: false }));
          }



          return (
            <div key={id} className="border rounded-lg px-4 py-3 my-4">
              {/* Header */}
              <div className="flex justify-between items-center" onClick={() => {
                if (inputFieldDisable[id]) {
                  setCardOpen((prev) => ({ ...prev, [id]: !prev[id] }));
                }
              }}>
                <div className="flex items-center">
                  <Image alt={`${celebrity.first} ${celebrity.last}`} src={celebrity.picture} className="rounded-full w-16" width={64} height={64} />
                  <input
                    name="cardName"
                    className={`${!inputFieldDisable[id] && 'border-2 border-slate-300 rounded-lg'} font-semibold w-3/5 ms-2 text-lg capitalize px-4`}
                    value={inputValue[`cardName_${id}`]}
                    onChange={(e) => handleInputChange(e, id)}
                    onBlur={() => handleSave(id)}
                    disabled={inputFieldDisable[id]}
                  />
                </div>
                <div className={cardOpen[id] ? 'rotate-0' : 'rotate-180'}>
                  {Icons.getComponent(Icons.UP_ARROW)}
                </div>
              </div>

              {/* Body */}
              {cardOpen[id] && (
                <>
                  <div className="grid grid-cols-3 my-6">
                    <div className="text-start">
                      <p className="text-slate-400">Age</p>
                      <input
                        name="age"
                        className={`${!inputFieldDisable[id] && 'border-2 border-slate-300 rounded-lg'}`}
                        value={`${inputValue[`age_${id}`]} years`}
                        onChange={(e) => handleInputChange(e, id)}
                        onBlur={() => handleSave(id)}
                        disabled={inputFieldDisable[id]}
                      />
                    </div>
                    <div>
                      <p className="text-slate-400">Gender</p>
                      <input
                        name="gender"
                        className={`${!inputFieldDisable[id] && 'border-2 border-slate-300 rounded-lg'}`}
                        value={inputValue[`gender_${id}`]}
                        onChange={(e) => handleInputChange(e, id)}
                        onBlur={() => handleSave(id)}
                        disabled={inputFieldDisable[id]}
                      />
                    </div>
                    <div>
                      <p className="text-slate-400">Country</p>
                      <input
                        name="country"
                        className={`${!inputFieldDisable[id] && 'border-2 border-slate-300 rounded-lg'}`}
                        value={inputValue[`country_${id}`]}
                        onChange={(e) => handleInputChange(e, id)}
                        onBlur={() => handleSave(id)}
                        disabled={inputFieldDisable[id]}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400">Description</p>
                    <textarea
                      name="description"
                      rows={4}
                      className={`${!inputFieldDisable[id] && 'border-2 border-slate-300 rounded-lg'} w-full`}
                      value={inputValue[`description_${id}`]}
                      onChange={(e) => handleInputChange(e, id)}
                      onBlur={() => handleSave(id)}
                      disabled={inputFieldDisable[id]}
                    />
                  </div>

                  {inputFieldDisable[id] ? (
                    <div className="flex justify-end mx-8 my-4">
                      <span className="px-2 py-2 cursor-pointer" onClick={() => openModal(celebrity)}>
                        {Icons.getComponent(Icons.TRASH, { color: 'red' })}
                      </span>
                      <span className="px-2 py-2 cursor-pointer" onClick={() => cardEdit(id)}>
                        {Icons.getComponent(Icons.PENCIL, { color: 'blue' })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-end mx-8 my-4">

                      <span className="px-2 py-2 cursor-pointer" >
                        {Icons.getComponent(Icons.CIRCLE_XMARK, { color: 'red' })}
                      </span>
                      <span className="px-2 py-2 me-2 cursor-pointer" onClick={() => setInputFieldDisable((prev) => ({ ...prev, [id]: true }))}>
                        {Icons.getComponent(Icons.CIRCLE_CHECK)}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        onDelete={handleDelete}
      />
    </div>
  );
}
