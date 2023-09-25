export interface ICarousel {
  active: boolean;
  image: string;
  title: string;
  subTitle: string;
}

export interface IRegisterPayload {
  fullName: string;
  email: string;
  mobileNo: string;
  password: string;
  cPassword: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IClasses {
  _id: string;
  tropicName: string;
  teacher: {
    name: string;
    fees: string;
    avatar: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  age: string;
  classTime: string;
  capacity: string;
  poster: string;
  active: true;
  createdAt: string;
  updatedAt: string;
  __v: string;
  id: string;
}

export interface IFacilities {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
  active: true;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

interface ISocialAccountOfPopularTeacher {
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
}

export interface IPopularTeacher {
  _id: string;
  fullName: string;
  designation: string;
  socialAccount: ISocialAccountOfPopularTeacher;
  avatar: string;
  active: true;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
