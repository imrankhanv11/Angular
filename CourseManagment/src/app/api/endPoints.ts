export const publicEnpoints = {
    Login: `/Account/Login`,
    Refresh: `/Account/Refresh`,
    Register: `/Account/Register`
}

export const privateEnpoints = {
    // User
    GetUser: `/User/GetUsers`,
    AddUser: `/User/Create`,
    DeleteUser: (id: string) => `/User/Delete/${id}`,
    UpdateUser: `/User/Edit`,

    // Course
    GetCourse: `/Course/GetCourses`,
    AddCourse: `/Course/Add`,
    DeleteCourse: (id: number) => `/Course/Delete/${id}`,
    UpdateCourse: `/Course/Edit`,
}