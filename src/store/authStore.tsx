import { create } from "zustand";

type Timetable = {
  [day: string]: {
    name: string;
    code: string;
    venue: string;
    slot: string;
    type: string;
    start_time: string;
    end_time: string;
  }[];
};

interface AuthStore {
  uuid: string;
  isLoggedIn: boolean;
  profile: string;
  username: string | null;
  name: string;
  email: string;
  token: string;
  timetable: Timetable | null;
  regNo: string;
  uploadTimetable: (timetable: Timetable) => void;
  deleteTimetable: () => void;

  login: (uuid: string, profile: string, name: string) => void;
  logout: () => void;
  updateUsername: (username: string) => void;
  updateToken: (token: string) => void;
  updateRegNo: (regNo: string) => void;
  initializeFromLocalStorge: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  uuid: "",
  isLoggedIn: false,
  profile: "",
  username: null,
  email: "",
  name: "",
  token: "",
  timetable: {},
  regNo: "", // Initialize timetable as an empty object
  uploadTimetable: (timetable) => {
    set(() => ({
      timetable,
    }));
  },
  deleteTimetable: () => {
    set(() => ({
      timetable: null,
    }));
  },
  updateRegNo: (regNo) => {
    set(() => ({
      regNo,
    }));
  },
  login: (uuid, profile, name) =>
    set(() => ({
      uuid,
      isLoggedIn: true,
      profile,
      name,
    })),
  logout: () => {
    set(() => ({
      uuid: "",
      isLoggedIn: false,
      profile: "",
      name: "",
      username: null,
    }));
    localStorage.clear();
  },
  updateUsername: (username: string) => {
    set(() => ({
      username,
    }));
  },
  updateToken: (token: string) => {
    set(() => ({
      token,
    }));
  },
  initializeFromLocalStorge: () => {
    const uuid = localStorage.getItem("uuid");
    const profile = localStorage.getItem("profile");
    const username = localStorage.getItem("username");
    if (uuid && profile && username) {
      set(() => ({
        uuid,
        isLoggedIn: true,
        profile,
        username,
      }));
    }
  },
}));
