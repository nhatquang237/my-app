import React, {  } from 'react';
import MemberHeader from './MemberHeader.js';

function member_row(index, member) {
  return <tr key={'memberTb_' + index}>
    <td>{index + 1}</td>
    <td>{member.name}</td>
    {/* Implement state for these numbers below */}
    <td className="numeric">{member.getAmountSpent()}</td>
    <td className="numeric">{member.getSpending()}</td>
    <td className="numeric">{member.getRemaining()}</td>
  </tr>;
}

const MemberTable = ({data}) => {

  return (
    <table >
      <MemberHeader />
      <tbody>
        {data.map((member, index) => (
          member_row(index, member)
        ))}
      </tbody>
    </table>
  )
}

export default MemberTable;
