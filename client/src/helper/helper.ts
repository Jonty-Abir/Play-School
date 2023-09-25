import { instance } from "../axios_instance/instance";
import {
  ICarousel,
  IClasses,
  IFacilities,
  ILoginPayload,
  IRegisterPayload,
  IPopularTeacher
} from "../interface/interface";

/*============== Get All Carousel  ================*/

export async function getAllCarousel(): Promise<ICarousel> {
  try {
    const { data, status } = await instance.get("/api/carousel");
    if (status !== 200) throw new Error("Bad Request..!");
    return new Promise((resolve) => resolve(data.result));
  } catch (error) {
    return new Promise((resolve, reject) => reject(error));
  }
}

/*============== Register ================*/

export async function register(payload: IRegisterPayload) {
  try {
    const { data, status } = await instance.post("/api/reg", { ...payload });
    if (status !== 201) throw new Error(data);
    return new Promise((resolve) => resolve(data));
  } catch (error) {
    // console.log(error);
    return new Promise((resolve, reject) => reject(error));
  }
}

/*==============Login  ================*/
export async function login(payload: ILoginPayload) {
  try {
    const { data, status } = await instance.post("/api/login", { ...payload });
    if (status !== 200) throw new Error(data);
    return new Promise((resolve) => resolve(data));
  } catch (error) {
    // console.log(error);
    return new Promise((resolve, reject) => reject(error));
  }
}

/*============== Verify Token  ================*/

export async function verifyToken(token: string) {
  try {
    const { data, status } = await instance.get("/api/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status !== 200) throw new Error("UnAuthorized..!");
    return new Promise((resolve) => resolve(data));
  } catch (error) {
    return new Promise((resolve, reject) => reject(error));
  }
}

/*==============  ================*/

/*============== Get All Carousel  ================*/

export async function getAllClasses(): Promise<IClasses[]> {
  try {
    const { data, status } = await instance.get("/api/classes");
    if (status !== 200) throw new Error("Bad Request..!");
    return new Promise((resolve) => resolve(data.result));
  } catch (error) {
    return new Promise((resolve, reject) => reject(error));
  }
}
/*============== GET ALL FASILITIES ================*/

export async function getAllFacilities(): Promise<IFacilities[]> {
  try {
    const { data, status } = await instance.get("/api/facilities");
    if (status !== 200) throw new Error("Bad Request..!");
    return new Promise((resolve) => resolve(data.result));
  } catch (error) {
    return new Promise((resolve, reject) => reject(error));
  }
}

/*============== GET ALL Popular Teacher ================*/

export async function getAllPopularTeacher(): Promise<IPopularTeacher[]> {
  try {
    const { data, status } = await instance.get("/api/popular-teachers");
    if (status !== 200) throw new Error("Bad Request..!");
    return new Promise((resolve) => resolve(data.result));
  } catch (error) {
    return new Promise((resolve, reject) => reject(error));
  }
}
