import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { stylesGral } from "../../css/Theme";
import { CustomModalSucces } from "../../components/CustomModalSucces";
import { CustumErrorInput } from "../../components/CustumErrorInput";
import { CustomconInput } from "../../components/CustomImputs";
import { padelApiUrl } from "../../../config/padelpertuttiApi";
import { CustomModal } from "../../components/CustomModal";

export const Register = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeErrorModal, setActiveErrorModal] = useState(false);
  const [textModal, setTextModal] = useState("");

  const handleCloseModal = () => {
    setActiveErrorModal(false);
    setActiveModal(false);
  };

  const handleSuccessCloseModal = () => {
    setActiveModal(false);
    navigation.goBack();
  };

  const registration = async (nombre, posicion, email, contraseña) => {
    try {
      const register = await padelApiUrl.post("/usuarios", {
        nombre,
        posicion,
        email,
        contraseña,
      });
      setActiveModal(true);
      setTextModal(register.data.msg + ". Ahora debe loguearse");
      formik.resetForm();
    } catch (error) {
      setActiveErrorModal(true);
      const errores = error.response.data.errors;
      for (const error of errores) {
        const mensajeError = error.msg;
        setTextModal(mensajeError);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      posicion: "",
      email: "",
      contraseña: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre y apellido es obligatorio"),
      posicion: Yup.string().required("La posicion de juego es requerida"),
      email: Yup.string()
        .email("El formato del email es incorrecto")
        .required("El email es requerido"),
      contraseña: Yup.string()
        .required("Debe ingresar su contraseña")
        .min(6, "La contraseña debe tener minimo de 6 carateres"),
    }),
    onSubmit: (values) => {
      registration(
        formik.values.nombre,
        formik.values.posicion,
        formik.values.email,
        formik.values.contraseña
      );
    },
  });

  return (
    <>
      <SafeAreaView style={stylesGral.safeAreaView}>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Padel per Tutti - Registrarse</Text>
          </View>
          <View style={styles.containerInputs}>
            <View>
              <Text style={styles.label}>Nombre y apellido</Text>
              <TextInput
                style={stylesGral.input}
                name="nombre"
                placeholder="Ingrese su nombre y apellido por favor"
                placeholderTextColor="grey"
                autoComplete="name"
                onChangeText={(value) => formik.setFieldValue("nombre", value)}
              />
              {formik.errors.nombre && (
                <CustumErrorInput message={formik.errors.nombre} />
              )}
            </View>
            <View>
              <Text style={styles.label}>Posición de juego</Text>
              <TextInput
                style={stylesGral.input}
                name="posicion"
                placeholder="¿Jugas de DRIVE o REVES?"
                placeholderTextColor="grey"
                onChangeText={(value) =>
                  formik.setFieldValue("posicion", value.toUpperCase())
                }
              />
              {formik.errors.posicion && (
                <CustumErrorInput message={formik.errors.posicion} />
              )}
            </View>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={stylesGral.input}
                name="email"
                placeholder="Ingrese su correo electronico"
                placeholderTextColor="grey"
                autoComplete="email"
                inputMode="email"
                onChangeText={(value) =>
                  formik.setFieldValue("email", value.toLowerCase())
                }
              />
              {formik.errors.email && (
                <CustumErrorInput message={formik.errors.email} />
              )}
            </View>
            <View>
              <Text style={styles.label}>Contraseña</Text>
              <CustomconInput name="contraseña" formik={formik} />
            </View>
            <View style={styles.button}>
              <Button
                title="Registrarse"
                color="green"
                onPress={formik.handleSubmit}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  VOLVER A INICIO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <CustomModalSucces
        activeModal={activeModal}
        text={textModal}
        handleSuccessCloseModal={handleSuccessCloseModal}
      />
      <CustomModal
        activeErrorModal={activeErrorModal}
        handleCloseModal={handleCloseModal}
        text={textModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerInputs: {
    flex: 1,
    marginTop: 40,
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,
  },
  label: {
    marginLeft: 12,
    color: "white",
  },
  button: {
    width: 150,
    alignSelf: "center",
    margin: 15,
  },
});
