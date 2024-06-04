import { Field, Form, Formik, FormikHelpers } from "formik";
import { InstrumentoNoItemProps } from "../Types/InstrumentoProps";
import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getData, postData, putData } from "../Api/genericCalls";
import { CategoriaProps } from "../Types/CategoriaProps";
import { makeStyles } from '@mui/styles';

interface FormInstrumentoProps {
    existingInstrumento?: InstrumentoNoItemProps;
    onClose: () => void;
    onSave: () => void;
}

const useStyles = makeStyles({
    root: {
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#ffffff",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        marginTop: "20px",
    },
    button: {
        backgroundColor: "#1976d2",
        color: "#ffffff",
        '&:hover': {
            backgroundColor: "#115293",
        },
    },
    modal: {
        width: "50%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        boxShadow: 24,
        padding: "16px",
        borderRadius: "10px",
    },
    filterButton: {
        margin: "5px",
    }
});

export const ModalInstrumento: React.FC<FormInstrumentoProps> = ({
    existingInstrumento,
    onClose,
}) => {
    const classes = useStyles();
    const handleSubmit = async (
        values: InstrumentoNoItemProps, // Cambia el tipo de 'values'
        formikHelpers: FormikHelpers<InstrumentoNoItemProps>
    ) => {
        try {
            if (existingInstrumento) {
                // Si existingInstrumento está definida, estamos editando un instrumento existente
                //await editarInstrumento(values.item);
                await putData<InstrumentoNoItemProps>("http://localhost:8080/instrumento/"+values.id, values)



            } else {
                // Si existingInstrumento no está definida, estamos creando un nuevo instrumento
                await postData<InstrumentoNoItemProps>("http://localhost:8080/instrumento/create", values)
            }
            onClose();
        } catch (error) {
            alert(
                "Hubo un error al procesar el instrumento. Por favor, inténtalo de nuevo."
            );
        }
        formikHelpers.setSubmitting(false);
    };

    const [categorias, setCategorias] = useState<CategoriaProps[]>();
    const [selectedCategoria, setselectedCategoria] = useState(
        existingInstrumento ? existingInstrumento.categoria?.id?.toString() : ""
    );
    useEffect(() => {
        async function getDataCategorias() {
            await getData<CategoriaProps[]>("http://localhost:8080/categoria")
                .then((categoriaData) => {
                    setCategorias(categoriaData);
                    if (existingInstrumento && existingInstrumento.categoria) {
                        setselectedCategoria(existingInstrumento.categoria.id?.toString());
                    }
                });
        }
        getDataCategorias();
    }, [existingInstrumento]);
    

    return (
        <Formik
            initialValues={{
                id: existingInstrumento ? existingInstrumento.id : 0,
                instrumento: existingInstrumento ? existingInstrumento.instrumento : "",
                marca: existingInstrumento ? existingInstrumento.marca : "",
                modelo: existingInstrumento ? existingInstrumento.modelo : "",
                imagen: existingInstrumento ? existingInstrumento.imagen : "",
                precio: existingInstrumento ? existingInstrumento.precio : 0.0,
                costoEnvio: existingInstrumento ? existingInstrumento.costoEnvio : "",
                cantidadVendida: existingInstrumento ? existingInstrumento.cantidadVendida : 0,
                descripcion: existingInstrumento ? existingInstrumento.descripcion : "",
                categoria: existingInstrumento ? existingInstrumento.categoria : null,
            }}

            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <Box
                        sx={{
                            "& > :not(style)": { m: 1, width: "100%" },
                            fontFamily: "sans-serif",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            overflowX: "hidden",
                            p: 1,
                        }}
                        className={classes.modal}
                    >
                        <h1 style={{ marginBottom: "30px" }}>
                            {existingInstrumento
                                ? `Editar "${existingInstrumento.instrumento}"`
                                : "Crear Nuevo Instrumento"}
                        </h1>

                        <Stack>
                            <label>Instrumento </label>
                            <Field
                                as={TextField}
                                name="instrumento"
                                placeholder="Nombre del instrumento..."
                                variant="outlined"
                            />
                        </Stack>
                        <Stack>
                            <label>Marca </label>
                            <Field
                                as={TextField}
                                name="marca"
                                placeholder="Marca del instrumento..."
                                variant="outlined"
                            />
                        </Stack>
                        <Stack>
                            <label>Modelo </label>
                            <Field
                                as={TextField}
                                name="modelo"
                                placeholder="Modelo del instrumento..."
                                variant="outlined"
                            />
                        </Stack>

                        <Stack>
                            <label>Imagen (URL) </label>
                            <Field
                                as={TextField}
                                name="imagen"
                                placeholder="Url imagen del instrumento..."
                                variant="outlined"
                            />
                        </Stack>

                        <Stack>
                            <label>Precio </label>
                            <Field
                                as={TextField}
                                name="precio"
                                placeholder="Precio del instrumento..."
                                variant="outlined"
                            />
                        </Stack>

                        <Stack>
                            <label>Costo Envio (G = gratis) </label>
                            <Field
                                as={TextField}
                                name="costoEnvio"
                                placeholder="Costo Envio del instrumento..."
                                variant="outlined"
                            />
                        </Stack>

                        <Stack>
                            <label>Cantidad Vendida </label>
                            <Field
                                as={TextField}
                                name="cantidadVendida"
                                placeholder="Cantidad Vendida del instrumento..."
                                variant="outlined"
                            />
                        </Stack>

                        <Stack>
                            <label>Descripcion </label>
                            <Field
                                as={TextField}
                                name="descripcion"
                                placeholder="Descripcion del instrumento..."
                                variant="outlined"
                            />
                        </Stack>

                        <Stack>
                            <label>Categoria</label>
                            <Field
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={selectedCategoria}
                                name="categoria.id"
                                as={Select}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    const value = event.target.value as string;
                                    setselectedCategoria(value);
                                    if (existingInstrumento) {
                                        const updatedCategoria = categorias?.find(categoria => categoria.id === parseInt(value));
                                        const updatedInstrumento = {
                                            ...existingInstrumento,
                                            categoria: updatedCategoria ? { ...updatedCategoria } : null
                                        };
                                        existingInstrumento = updatedInstrumento;
                                    }
                                    setFieldValue("categoria.id", value);
                                }}                                
                                
                            >
                                {categorias?.map((e) => (
                                    <MenuItem key={e.id} value={e.id?.toString()}>
                                        {e.denominacion}
                                    </MenuItem>
                                ))}
                            </Field>
                        </Stack>
                        <Button type="submit" disabled={isSubmitting} variant="outlined">
                            Enviar
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};