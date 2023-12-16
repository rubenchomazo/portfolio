export class Notification {
  name: string;
  email: string;
  subject: string;
  content: string;
  constructor(
    _name: string,
    _email: string,
    _subject: string,
    _content: string
  ) {
    this.name = _name;
    this.email = _email;
    this.subject = _subject;
    this.content = _content;
  }
}
