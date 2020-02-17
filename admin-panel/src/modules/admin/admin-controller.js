import adminService from './admin-service';
import ADMIN_URLS from './admin-urls';
import * as helpers from './admin-view-helpers';

export const methods = {
  renderAdminsPage: 'renderAdminsPage',
  renderCreateAdminPage: 'renderCreateAdminPage',
  renderAdminPage: 'renderAdminPage',
  updateAdmin: 'updateAdmin',
  createAdmin: 'createAdmin',
  deleteAdmin: 'deleteAdmin',
  changeRoleToAdmin: 'changeRoleToAdmin',
  changeRoleToSuperAdmin: 'changeRoleToSuperAdmin',
  activateAccount: 'activateAccount',
  deactivateAccount: 'deactivateAccount',
};

class UserController {
  async [methods.renderAdminsPage](request, response) {
    const admins = await adminService.api.getAllAdminUsers(request);
    response.render('admin/admin-views/admins', {
      title: 'Admins',
      layout: 'main',
      users: admins,
      currentUser: request.user,
      helpers,
    });
  }

  async [methods.renderAdminPage](request, response) {
    const user = await adminService.api.getUserById(request);
    response.render('admin/admin-views/admin', {
      title: 'Admins',
      layout: 'main',
      user,
      currentUser: request.user,
      helpers,
    });
  }

  async [methods.renderCreateAdminPage](request, response) {
    response.render('admin/admin-views/admin', {
      title: 'Admins',
      layout: 'main',
      currentUser: request.user,
      helpers,
    });
  }

  async [methods.createAdmin](request, response) {
    const admin = await adminService.api.createUser(request);
    return admin.id
      ? response.redirect(ADMIN_URLS.ADMINS + admin.id)
      : response.render('admin/admin-views/admin', {
          title: 'Admins',
          layout: 'main',
          message: admin.error && admin.error.message,
          currentUser: request.user,
          helpers,
        });
  }

  async [methods.updateAdmin](request, response) {
    const user = await adminService.api.updateUserById(request);
    const errorMessage = user.error && user.error.message;
    const userData = errorMessage
      ? await adminService.api.getUserById(request)
      : user;
    response.render('admin/admin-views/admin', {
      title: 'Admins',
      layout: 'main',
      user: userData,
      message: user.error && user.error.message,
      currentUser: request.user,
      helpers,
    });
  }

  async [methods.deleteAdmin](request, response) {
    await adminService.api.deleteUserById(request);
    response.redirect(ADMIN_URLS.ADMINS);
  }

  async [methods.activateAccount](request, response) {
    await adminService.api.activateUserAccountById(request);
    response.redirect(ADMIN_URLS.ADMINS + request.data.id);
  }

  async [methods.deactivateAccount](request, response) {
    await adminService.api.deactivateUserAccountById(request);
    response.redirect(ADMIN_URLS.ADMINS + request.data.id);
  }

  async [methods.changeRoleToAdmin](request, response) {
    await adminService.api.makeAdminById(request);
    response.redirect(ADMIN_URLS.ADMINS + request.data.id);
  }

  async [methods.changeRoleToSuperAdmin](request, response) {
    await adminService.api.makeSuperAdminById(request);
    response.redirect(ADMIN_URLS.ADMINS + request.data.id);
  }
}

export default UserController;
