import HTTP_STATUS_CODE from 'http-status-codes';
import { compose } from 'ramda';
import requestValidator from '../../lib/routes/decorators/request-validation-decorator';
import { renderHelpPageSchema } from './help-schema';

const validationRules = { renderHelpPage: renderHelpPageSchema };

class HelpController {
  async renderHelpPage(request, response) {
    response.status(HTTP_STATUS_CODE.OK).render('./help/help-page', {
      currentUser: request.user,
      title: 'Help',
      isHelp: true,
    });
  }
}

const EnhancedHelpController = compose(requestValidator(validationRules))(
  HelpController,
);

export default new EnhancedHelpController();
