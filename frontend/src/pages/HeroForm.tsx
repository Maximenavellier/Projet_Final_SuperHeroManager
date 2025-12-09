import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// CORRECTION : Imports nommés obligatoires
import { createHero, updateHero, fetchHeroById } from '../api/heroApi'; 

const HeroForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Si on a un ID, c'est une modification
  const isEditMode = !!id;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Configuration du formulaire et validation
  const formik = useFormik({
    initialValues: {
      nom: '',
      alias: '',
      univers: 'Marvel', // Valeur par défaut
      pouvoirs: '',
      description: '',
      image: null as File | null, // Pour stocker le fichier
    },
    validationSchema: Yup.object({
      nom: Yup.string().required('Le nom est requis'),
      alias: Yup.string().required('L\'alias est requis'),
      univers: Yup.string().required('L\'univers est requis'),
      description: Yup.string().required('La description est requise'),
      // L'image est requise seulement en création
      image: isEditMode ? Yup.mixed() : Yup.mixed().required('Une image est requise'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('nom', values.nom);
        formData.append('alias', values.alias);
        formData.append('univers', values.univers);
        formData.append('pouvoirs', values.pouvoirs); // Le backend gère la transformation en tableau
        formData.append('description', values.description);
        
        if (values.image) {
          formData.append('image', values.image);
        }

        if (isEditMode && id) {
          await updateHero(id, formData);
        } else {
          await createHero(formData);
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error("Erreur lors de l'enregistrement", error);
        alert("Une erreur est survenue.");
      }
    },
  });

  // Si on est en mode édition, on charge les données du héros
  useEffect(() => {
    if (isEditMode && id) {
      const loadHero = async () => {
        try {
          const { data } = await fetchHeroById(id);
          // On remplit le formulaire avec les données reçues
          formik.setValues({
            nom: data.nom,
            alias: data.alias,
            univers: data.univers,
            pouvoirs: Array.isArray(data.pouvoirs) ? data.pouvoirs.join(', ') : data.pouvoirs,
            description: data.description,
            image: null // On ne remet pas le fichier, juste l'URL pour l'aperçu
          });
          // Gestion de l'aperçu de l'image existante
          const imgUrl = data.image.startsWith('http') ? data.image : `http://localhost:5000/${data.image}`;
          setPreviewImage(imgUrl);
        } catch (error) {
          console.error("Erreur chargement héros", error);
        }
      };
      loadHero();
    }
  }, [id, isEditMode]);

  // Gestion du changement d'image pour l'aperçu
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      formik.setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? 'Modifier le Héros' : 'Ajouter un Héros'}
      </h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Nom */}
        <div>
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            {...formik.getFieldProps('nom')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.nom && formik.errors.nom && (
            <div className="text-red-500 text-sm">{formik.errors.nom}</div>
          )}
        </div>

        {/* Alias */}
        <div>
          <label className="block text-gray-700">Alias (Nom civil)</label>
          <input
            type="text"
            {...formik.getFieldProps('alias')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.alias && formik.errors.alias && (
            <div className="text-red-500 text-sm">{formik.errors.alias}</div>
          )}
        </div>

        {/* Univers */}
        <div>
          <label className="block text-gray-700">Univers</label>
          <select
            {...formik.getFieldProps('univers')}
            className="w-full p-2 border rounded"
          >
            <option value="Marvel">Marvel</option>
            <option value="DC Comics">DC Comics</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Pouvoirs */}
        <div>
          <label className="block text-gray-700">Pouvoirs (séparés par des virgules)</label>
          <input
            type="text"
            {...formik.getFieldProps('pouvoirs')}
            className="w-full p-2 border rounded"
            placeholder="Ex: Vol, Force, Rayons laser"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            {...formik.getFieldProps('description')}
            className="w-full p-2 border rounded"
            rows={4}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
          
          {/* Aperçu */}
          {previewImage && (
            <div className="mt-4">
              <p>Aperçu :</p>
              <img src={previewImage} alt="Aperçu" className="h-40 w-auto rounded shadow" />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 font-bold"
        >
          {isEditMode ? 'Enregistrer les modifications' : 'Créer le Héros'}
        </button>
      </form>
    </div>
  );
};

export default HeroForm;