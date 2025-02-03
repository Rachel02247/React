import { array, object, string } from 'yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal, TextField, Box, Button } from '@mui/material';
import { AppDispatch, RootState } from '../global_state/redux/store';
import { addRecipes, fetchRecipes } from '../global_state/redux/recipesSlice';
import { styleModal } from '../login/loginApi';
import { setIsOpen } from '../global_state/redux/addRecipeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RecipeType } from '../types';

const schema = object({
    title: string().required(),
    description: string(),
    ingredients: array().of(string().required("Ingredient cannot be empty")).min(1, "At least one ingredient is required"),
    instructions: string()
});

const AddRecipe = () => {

    const dispatch = useDispatch<AppDispatch>();
    const isOpenModal = useSelector((state: RootState) => state.isFormOpen.isOpen);

    const {
        formState: { errors },
        control,
        register,
        handleSubmit,
        reset,
    } = useForm({ resolver: yupResolver(schema) })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients' as never
    });

    const onSubmit = (data: RecipeType) => {

        reset();
        dispatch(setIsOpen(false));
        dispatch(addRecipes(data));
        dispatch(fetchRecipes());
    }

    return (<>
        <Modal open={isOpenModal} >

            <Box sx={styleModal}>

                <h3>hi👩‍🍳 enter your recipe :)</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField variant="filled" margin="normal" fullWidth label="title" {...register('title')} />
                    {errors.title?.message && <div>{errors.title?.message} </div>}

                    <TextField variant="filled" margin="normal" fullWidth label="description" {...register('description')} />
                    {errors.description?.message && <div>{errors.description?.message} </div>}

                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <br />
                            <TextField {...register(`ingredients.${index}`)} label={`product ${index + 1}`} />
                            <span>  </span>
                            <Button style={{ color: '#8E6549', border: '2px solid #8E6549' }} onClick={() => remove(index)}>remove product</Button>
                        </div>
                    ))}
                    <Button style={{ color: '#8E6549', border: '2px solid #8E6549' }} onClick={() => append('')} sx={{ mt: 2 }}>
                        <strong>add product</strong>
                    </Button>
                    {errors.ingredients?.message && <div>{errors.ingredients?.message} </div>}


                    <TextField variant="filled" margin="normal" fullWidth label="instructions" {...register('instructions')} />
                    {errors.instructions?.message && <div>{errors.instructions?.message} </div>}

                    <Button sx={{ marginTop: '2px', bgcolor: '#5E4238' }} color="info" fullWidth variant="contained" type="submit">Save Recipe</Button>
                </form>
            </Box>
        </Modal>

    </>)
};

export default AddRecipe;