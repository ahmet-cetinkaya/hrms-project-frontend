import React from 'react';

export default function Steps() {
  return (
    <div className='row px-5 my-5'>
      <div className='col'>
        <h1 className='fw-bold display-5'>
          <span className='text-secondary'>遵循</span> <br /> 简单 4 步
        </h1>
        <p className='text-muted mt-4'>
          使用我们的链上世界杯博彩平台，您可以为自己看好的球队和球员投注。投注和兑现完全由智能合约完成，
          运行在以太坊测试链上，公开透明。
        </p>
      </div>
      <div className='col text-center'>
        <div className='row'>
          <div className='col-6'>
            <i className='bi bi-person fs-1 text-primary' />
            <div className='fw-bold'>链接您的钱包</div>
            <div className='text-muted px-5'>首先在这里将您的钱包链接到平台.</div>
          </div>
          <div className='col-6 mt-4'>
            <i className='bi bi-file-earmark-person fs-1 text-danger' />
            <div className='fw-bold'>下注证明</div>
            <div className='text-muted px-5'>获得NFT作为下注证明.</div>
          </div>
          <div className='col-6'>
            <i className='bi bi-search fs-1 text-success' />
            <div className='fw-bold'>选择玩法</div>
            <div className='text-muted px-5'>选择您喜爱的玩法下注.</div>
          </div>
          <div className='col-lg-6 mt-4'>
            <i className='bi bi-check2-circle fs-1 text-secondary' />
            <div className='fw-bold'>NFT交易</div>
            <div className='text-muted px-5'>加入我们的二级市场与全球玩家随时交易您的NFT.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
