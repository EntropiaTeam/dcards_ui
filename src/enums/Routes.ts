export enum RoutePath {
  Root = '/',
  Catalog = '/categories/:categoryId/cards',
  Editors = '/categories/:categoryId/cards/:cardId/edit',
  PhotoEditor = '/categories/:categoryId/cards/:cardId/edit/photo',
  TextEditor = '/categories/:categoryId/cards/:cardId/edit/text',
  Message = '/categories/:categoryId/cards/:cardId/edit/text/mobile',
  Agreement = '/categories/:categoryId/cards/agreement'
}
