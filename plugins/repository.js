import OfficeRepository from '~/api/office/office.repository'
import AccountRepository from '~/api/account/account.repository'
import DocumentRepository from '~/api/documents/documents.repository'

export default (ctx, inject) => {
  // dependency injection
  /* const api = {
      accounts: {
        account: AccountRepository(ctx.$axios)
      }
    }
  inject('accountRepository', AccountRepository(ctx.$axios)) */

  inject('officeRepository', OfficeRepository(ctx.$axios))
  inject('accountRepository', AccountRepository(ctx.$axios))
  inject('documentsRepository', DocumentRepository(ctx.$axios))
}
