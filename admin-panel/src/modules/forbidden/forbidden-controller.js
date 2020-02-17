import HTTP_STATUS_CODE from 'http-status-codes';
import adminService from '../admin/admin-service';

class ForbiddenController {
  async renderForbiddenPage(request, response) {
    const user = await adminService.api.getUserById({
      user: request.user,
      data: { id: request.user.id },
    });
    const layout = !request.user.id || user.error ? 'auth' : 'main';
    response.status(HTTP_STATUS_CODE.OK).render('./forbidden/forbidden-page', {
      title: 'Forbidden',
      layout,
      isForbidden: true,
      noHeader: true,
      noFooter: true,
    });
  }
}

export default new ForbiddenController();
