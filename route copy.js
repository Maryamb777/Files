import { response } from 'next';
import prisma from '../../../../prisma/client/index';

import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);

  const userId = url.searchParams.get('userId');
  const { academicDomainName } = req.query;

  try {
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            id: userId
          },
          {
            academicDomainName: academicDomainName
          },
          {
            role: 'SAT'
          }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        academicDomainName: true
      }
    });
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
  if (!user) {
    // If user doesn't exist, return 404 Not Found
    return NextResponse.error(new Error('User not found'), { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

