/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-28T12:11:23-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-28T12:11:46-03:00
 */

export default async function handler(req, res) {
  const data = {
    message: 'Hello from the server!'
  };

  res.status(200).json(data);
}