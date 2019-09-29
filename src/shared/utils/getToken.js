import crypto from 'crypto';


export default (value = crypto.randomBytes(32).toString('hex')) => crypto.createHmac(
  'sha512',
  crypto.randomBytes(128).toString('hex')
).update(value).digest('hex');
